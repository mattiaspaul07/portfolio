// Draws the isometric office as SVG: furniture, markers, avatar, walking, light switch and coffee break.
// Consumes iso.js (iso, pts, shade, el, poly, line, box), walk.js (findPath) and SITE / SECTION_ORDER.
// Produces drawRoom(svg, { onPick(key) }) -> { setSelected(key), setHover(key | null) }.
(function(){
const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const ICONS = {
    about:'<circle cx="0" cy="-3" r="2.6"/><path d="M-5 5.5a5 5 0 0 1 10 0"/>',
    experience:'<path d="M-6 3h12"/><circle cx="-4" cy="3" r="1.3"/><circle cx="0" cy="3" r="1.3"/><circle cx="4" cy="3" r="1.3"/><path d="M-4 -1v-4M0 -1v-2M4 -1v-5"/>',
    projects:'<path d="M-6 -4h4l1.5 2h6.5v8h-12z"/>',
    toolkit:'<path d="M-6 -1h12v6h-12z"/><path d="M-3 -1v-2.5h6v2.5"/><path d="M-6 2h12"/>',
    education:'<path d="M-6 -5h4.5a1.5 1.5 0 0 1 1.5 1.5v10a1.5 1.5 0 0 0 -1.5 -1.5h-4.5zM6 -5h-4.5a1.5 1.5 0 0 0 -1.5 1.5v10a1.5 1.5 0 0 1 1.5 -1.5h4.5z"/>',
    contact:'<path d="M-6 -5h12v8h-6l-3.5 3v-3h-2.5z"/>'
  };
  const PAL = {
    day:{wallL:"#dfe8e2", wallR:"#cddbd3", floor:"#ecdfc8", plank:"#e0cfb0", rug:"#cfe0d8", sky:"#bfe0ee", mtn:"#7d97a8", mtn2:"#5f7a8c", water:"#5b93b0",
         wood:"#c49a6c", teal:"#2f7d6d", coral:"#e07a5f", dark:"#33403b", desk:"#f7f3ea", screen:"#22303a", glow:null, sun:"#fffbe8",
         tag:"#1f2624", tagtext:"#ffffff", plate:"#fbfaf6"},
    evening:{wallL:"#3d4b5c", wallR:"#344150", floor:"#6e5c49", plank:"#63523f", rug:"#3f5a55", sky:"#2c3a63", mtn:"#1f2a45", mtn2:"#18213a", water:"#2c4a6b",
         wood:"#9c7650", teal:"#2a6e60", coral:"#c9664c", dark:"#222b29", desk:"#d9d2c2", screen:"#101820", glow:"#ffd98a", sun:null,
         tag:"#fffdf8", tagtext:"#1f2624", plate:"#d9d6cc"}
  };

  /* where the avatar stands for each place, which way it faces, and where the marker is anchored (top centre of the object) */
  const SPOTS = {
    about:{x:6.4,y:3.2,f:"+x"}, experience:{x:1.25,y:2.9,f:"-x"}, projects:{x:7.6,y:6.7,f:"+y"},
    toolkit:{x:2.4,y:8.2,f:"+y"}, education:{x:4.0,y:1.6,f:"-y"}, contact:{x:1.8,y:5.3,f:"-x"}, coffee:{x:6.4,y:5.4,f:"+y"}
  };
  const ANCHORS = {
    // each anchor is the top centre of its object, so the marker stem lands on the middle of the item
    about:[9.24,3.85,1.45],      // sofa: middle of the backrest
    experience:[0.02,2.9,5.0],   // whiteboard: middle of the top edge
    projects:[5.3,6.21,2.15],    // desk: top of the centred monitor
    toolkit:[2.4,9.45,2.05],     // toolbox: top of the handle
    education:[4.0,0.4,3.8],     // bookshelf: middle of the top
    contact:[0.02,6.95,4.7]      // message screen: middle of the top edge
  };
const wallY=(x1,x2,z1,z2)=>[[x1,0.02,z1],[x2,0.02,z1],[x2,0.02,z2],[x1,0.02,z2]];
const wallX=(y1,y2,z1,z2)=>[[0.02,y1,z1],[0.02,y2,z1],[0.02,y2,z2],[0.02,y1,z2]];

  function drawRoom(svg, opts){
    const st={mood:"day", ax:SPOTS.projects.x, ay:SPOTS.projects.y, facing:"+y", phase:0, path:[], moving:false, endFacing:"+y", current:null, speed:4};
    let mid, top, avatarG, cupG, sortables=[], hots={}, markers={}, raf=null, last=0, sipTimer=null;
    const blockers=[];
    const addSortable=(foot,g)=>sortables.push({foot,g});

    function build(){
      svg.textContent=""; sortables=[]; hots={}; markers={}; blockers.length=0;
      const P=PAL[st.mood];
      const back=el("g",{},svg); mid=el("g",{},svg); top=el("g",{},svg);

      // room shell
      poly(back,[[0,0,0],[0,10,0],[0,10,7],[0,0,7]],P.wallL);
      poly(back,[[0,0,0],[10,0,0],[10,0,7],[0,0,7]],P.wallR);
      poly(back,[[0,0,0],[10,0,0],[10,10,0],[0,10,0]],P.floor,{class:"floor"}).addEventListener("click",onFloorClick);
      const deco=el("g",{"pointer-events":"none"},back);
      for(let i=1;i<10;i++) line(deco,[[i,0,0],[i,10,0]],P.plank,1);
      poly(deco,[[0,0,0],[0,10,0],[0,10,0.25],[0,0,0.25]],shade(P.wallL,.85));
      poly(deco,[[0,0,0],[10,0,0],[10,0,0.25],[0,0,0.25]],shade(P.wallR,.85));
      poly(deco,[[2.8,5,0.01],[8,5,0.01],[8,9,0.01],[2.8,9,0.01]],P.rug);
      if(P.sun) poly(deco,[[5.8,0.3,0.01],[8.7,0.3,0.01],[8.7,2.6,0.01],[5.8,2.6,0.01]],P.sun,{opacity:.45});

      // window
      const win=el("g",{"pointer-events":"none"},back);
      poly(win,wallY(5.6,8.9,2.4,5.5),P.sky);
      if(!P.sun) [[6.1,5.1],[7.0,4.8],[8.3,5.2],[6.6,5.3]].forEach(([x,z])=>poly(win,wallY(x,x+0.06,z,z+0.06),"#e9e3ff"));
      poly(win,[[5.6,0.02,3.3],[6.3,0.02,4.6],[6.9,0.02,3.9],[7.8,0.02,5.0],[8.9,0.02,3.6],[8.9,0.02,2.4],[5.6,0.02,2.4]],P.mtn);
      poly(win,[[5.6,0.02,2.9],[6.6,0.02,3.5],[7.4,0.02,3.1],[8.9,0.02,3.3],[8.9,0.02,2.4],[5.6,0.02,2.4]],P.mtn2);
      poly(win,wallY(5.6,8.9,2.4,2.8),P.water);
      [["#b8433a",5.9],["#f2e6c9",6.35],["#e8c35a",6.8],["#b8433a",7.3]].forEach(([c,x])=>poly(win,wallY(x,x+0.35,2.8,3.15),c));
      if(P.glow) [6.0,6.45,6.9,7.4].forEach(x=>poly(win,wallY(x,x+0.1,2.9,3.0),P.glow));
      poly(win,wallY(5.6,8.9,2.4,5.5),"none",{stroke:"#f7f3ea","stroke-width":4});
      line(win,[[7.25,0.02,2.4],[7.25,0.02,5.5]],"#f7f3ea",3);
      line(win,[[5.6,0.02,3.95],[8.9,0.02,3.95]],"#f7f3ea",3);

      // door with medal (decoration, not a destination)
      const door=el("g",{"pointer-events":"none"},back);
      poly(door,wallY(0.8,2.4,0,4.4),P.teal);
      poly(door,wallY(0.95,2.25,0.2,4.25),shade(P.teal,1.12));
      poly(door,wallY(1.15,2.05,3.2,3.7),"#f7f3ea");
      poly(door,wallY(2.0,2.15,1.9,2.1),"#e8c35a");
      line(door,[[2.0,0.04,1.98],[2.06,0.04,1.42]],"#2f7d6d",3); line(door,[[2.16,0.04,1.98],[2.1,0.04,1.42]],"#e07a5f",3);
      poly(door,Array.from({length:12},(_,i)=>[2.08+0.13*Math.cos(i*Math.PI/6),0.04,1.3+0.13*Math.sin(i*Math.PI/6)]),"#e2b13c",{stroke:"#b3862a","stroke-width":1.2});
      poly(door,[[0.9,0,0.01],[2.3,0,0.01],[2.3,1.2,0.01],[0.9,1.2,0.01]],P.coral,{opacity:.85});

      // wall destinations
      hot("experience",[{draw:g=>{
        poly(g,wallX(1.0,4.8,2.2,5.0),"#fbfbf7",{stroke:"#8d9a94","stroke-width":2});
        line(g,[[0.04,1.4,3.4],[0.04,4.4,3.4]],"#56625d",2);
        [[1.5,"#3b7fc4"],[2.1,"#3b7fc4"],[2.6,"#3b7fc4"],[3.3,"#e07a5f"],[3.8,"#e07a5f"],[4.3,"#2f7d6d"]].forEach(([y,c],i)=>{
          poly(g,[[0.04,y-0.1,3.3],[0.04,y+0.1,3.3],[0.04,y+0.1,3.5],[0.04,y-0.1,3.5]],c);
          line(g,[[0.04,y-0.15,i%2?3.0:3.9],[0.04,y+0.25,i%2?3.0:3.9]],"#9aa7a1",2);
        });
        poly(g,[[0.04,1.2,2.1],[0.04,4.6,2.1],[0.25,4.6,2.1],[0.25,1.2,2.1]],"#b9c3be");
      }}], back);
      hot("contact",[{draw:g=>{   // pin board with post-it notes
        const W=(y1,y2,z1,z2,c,ex)=>poly(g,[[0.05,y1,z1],[0.05,y2,z1],[0.05,y2,z2],[0.05,y1,z2]],c,ex);
        W(5.5,8.4,2.5,4.7,P.wood);
        W(5.62,8.28,2.62,4.58,"#cfa877");
        [[6.0,3.1],[7.1,4.2],[7.9,3.0],[5.9,4.3]].forEach(([y,z])=>W(y,y+0.05,z,z+0.05,"#b48c5c"));     // cork texture
        // [y, z, colour, kind, width, height]; kind: "env" envelope doodle, "hi" handwritten note
        const notes=[[5.75,3.78,"#f7e27a"],[6.43,3.84,"#f6b8c2","hi",0.86,0.66],[7.38,3.72,"#a8dccf"],[5.9,2.82,"#b9d4f2"],[6.72,2.76,"#f7e27a","env"],[7.58,2.9,"#f9c38a"]];
        notes.forEach(([y,z,c,kind,w=0.62,h=0.6])=>{
          W(y+0.03,y+w+0.03,z-0.03,z+h-0.03,"rgba(0,0,0,.12)");
          W(y,y+w,z,z+h,c);
          W(y+w/2-0.04,y+w/2+0.04,z+h-0.1,z+h-0.02,"#d65a4a");               // pin
          if(kind==="env"){ W(y+0.13,y+0.49,z+0.12,z+0.38,"#ffffff",{stroke:"#56625d","stroke-width":1});
                   line(g,[[0.06,y+0.13,z+0.38],[0.06,y+0.31,z+0.24],[0.06,y+0.49,z+0.38]],"#56625d",1); }
          else if(kind==="hi"){   // text drawn on the wall plane: skewed so it lies flat on the left wall
            const [tx,ty]=iso(0.06,y+w/2,z+h/2-0.12);
            const t=el("text",{transform:`matrix(0.866,-0.5,0,1,${tx},${ty})`, "text-anchor":"middle", "font-family":"Caveat, 'Segoe Print', cursive", "font-size":6.6, "font-weight":700, fill:"#7a2f2a"},g);
            t.textContent="Say hi!"; }
          else { line(g,[[0.06,y+0.1,z+0.36],[0.06,y+0.5,z+0.36]],"#56625d",1.2); line(g,[[0.06,y+0.1,z+0.22],[0.06,y+0.4,z+0.22]],"#56625d",1.2); }
        });
      }}], back);

      // light switch, left of the door
      const on=st.mood==="evening";
      const sw=el("g",{class:"switch", tabindex:"0", role:"switch", "aria-checked":String(on), "aria-label":"Light switch. Off is daylight, on is evening."},back);
      poly(sw,wallY(0.22,0.62,2.0,2.6),P.plate,{stroke:"#8d9a94","stroke-width":1.5, class:"plate"});
      poly(sw,wallY(0.32,0.52,on?2.32:2.1,on?2.5:2.28),on?"#e8c35a":"#b9c3be");
      const [swx,swy]=iso(0.42,0,2.3);
      el("rect",{x:swx-16, y:swy-18, width:32, height:34, fill:"transparent"},sw);
      sw.addEventListener("click",()=>toggleMood());
      sw.addEventListener("keydown",e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); toggleMood(); } });

      // floor destinations
      hot("education",[{foot:{x:3.1,y:0,w:1.8,d:0.8}, draw:g=>{   // centred between door (ends 2.4) and window (starts 5.6)
        box(g,3.1,0,0,1.8,0.8,3.8,P.wood);
        const books=["#2f7d6d","#e07a5f","#3b7fc4","#e8c35a","#56625d","#c9583c"];
        [0.3,1.5,2.7].forEach((z,r)=>{ for(let i=0;i<7;i++){ const x=3.25+i*0.22, h=0.75+((i+r)%3)*0.08; poly(g,[[x,0.81,z],[x+0.17,0.81,z],[x+0.17,0.81,z+h],[x,0.81,z+h]],books[(i+r)%6]); } });
        poly(g,wallY(3.4,4.6,4.2,5.0),"#fbfbf7",{stroke:P.wood,"stroke-width":3});
        line(g,[[3.65,0.03,4.55],[4.35,0.03,4.55]],"#c9a14a",3);
      }}], mid);
      hot("projects",[
        {foot:{x:4.8,y:4.2,w:1.0,d:1.0}, draw:g=>{   // office chair
          const F="#2b3138", CH="#9aa3a8", CU=shade(P.teal,.9);
          box(g,4.85,4.66,0.1,0.9,0.08,0.07,F); box(g,5.26,4.25,0.1,0.08,0.9,0.07,F);
          [[4.82,4.64],[5.66,4.64],[5.24,4.2],[5.24,5.06]].forEach(([x,y])=>box(g,x,y,0,0.12,0.12,0.1,"#15181c"));
          box(g,5.24,4.64,0.17,0.12,0.12,0.8,CH);
          box(g,5.25,4.2,0.95,0.1,0.12,0.6,CH);
          box(g,4.9,4.16,1.45,0.8,0.16,1.05,F);
          poly(g,[[4.98,4.33,1.55],[5.62,4.33,1.55],[5.62,4.33,2.4],[4.98,4.33,2.4]],CU);
          box(g,4.85,4.3,0.95,0.9,0.85,0.2,F);
          box(g,4.92,4.36,1.15,0.76,0.72,0.06,CU);
          box(g,4.86,4.5,1.15,0.07,0.07,0.32,F); box(g,4.82,4.42,1.47,0.14,0.55,0.06,F);
          box(g,5.67,4.5,1.15,0.07,0.07,0.32,F); box(g,5.64,4.42,1.47,0.14,0.55,0.06,F);
        }},
        {foot:{x:3.6,y:6.0,w:3.4,d:1.2}, draw:g=>{   // desk with centred screen
          box(g,3.6,6.0,0,3.4,1.2,1.4,P.desk);
          poly(g,[[3.6,7.2,0.5],[7.0,7.2,0.5],[7.0,7.2,0.62],[3.6,7.2,0.62]],P.teal);
          box(g,4.95,6.15,1.4,0.7,0.12,0.75,P.dark); box(g,5.25,6.3,1.4,0.1,0.1,0.15,P.dark);
          if(P.glow) poly(g,[[4.97,6.28,1.5],[5.63,6.28,1.5],[5.63,6.28,2.08],[4.97,6.28,2.08]],"#9fd3f0",{opacity:.5});
          { const [tx,ty]=iso(5.3,7.21,0.82);   // coffee counter, written on the desk front above the stripe
            const t=el("text",{class:"coffee-count", transform:`matrix(0.866,0.5,0,1,${tx},${ty})`, "text-anchor":"middle", "font-family":"IBM Plex Mono, Consolas, monospace", "font-size":8.5, "font-weight":500, "letter-spacing":"0.6", fill:"#2f7d6d"},g);
            t.textContent=coffeeLabel(coffeeCount()); }
          box(g,3.95,6.4,1.4,0.35,0.25,0.12,"#1d2321");
          box(g,4.3,6.75,1.4,0.5,0.35,0.06,"#e8c35a");   // project folder
        }}
      ], mid);
      hot("about",[
        {foot:{x:8.3,y:2.6,w:1.1,d:2.5}, draw:g=>{   // sofa facing the desk
          const T=P.teal, Lt=shade(P.teal,1.15), D="#2b2f33";
          [[8.35,2.65],[9.25,2.65],[8.35,4.95],[9.25,4.95]].forEach(([x,y])=>box(g,x,y,0,0.1,0.1,0.15,D));
          box(g,8.3,2.6,0.15,1.1,2.5,0.35,shade(T,.9));
          box(g,8.3,2.6,0.5,1.1,0.3,0.5,T);
          box(g,8.4,2.9,0.5,0.7,0.95,0.24,Lt); box(g,8.4,3.85,0.5,0.7,0.95,0.24,Lt);
          box(g,8.84,2.92,0.72,0.24,0.92,0.62,Lt); box(g,8.84,3.86,0.72,0.24,0.92,0.62,Lt);
          box(g,8.62,3.05,0.74,0.2,0.5,0.45,P.coral); box(g,8.62,4.25,0.74,0.2,0.45,0.42,"#e8c35a");
          box(g,9.08,2.6,0.5,0.32,2.5,0.95,T);
          box(g,8.3,4.8,0.5,1.1,0.3,0.5,T);
        }},
        {foot:{x:7.0,y:3.1,w:0.9,d:1.5}, draw:g=>{   // coffee table with coffee
          [[7.05,3.15],[7.75,3.15],[7.05,4.45],[7.75,4.45]].forEach(([x,y])=>box(g,x,y,0,0.1,0.1,0.4,P.wood));
          box(g,7.0,3.1,0.4,0.9,1.5,0.08,P.wood);
          box(g,7.35,3.7,0.48,0.22,0.22,0.25,P.coral);   // orange block, swapped from the desk
        }}
      ], mid);

      // coffee cup: a small playful interaction, not a section
      cupG=el("g",{class:"hot", tabindex:"0", role:"button", "aria-label":"Coffee cup on the desk. Take a coffee break."},mid);
      box(cupG,6.3,6.5,1.4,0.22,0.22,0.24,"#f7f3ea");
      poly(cupG,[[6.33,6.53,1.641],[6.49,6.53,1.641],[6.49,6.69,1.641],[6.33,6.69,1.641]],"#5a3a26");
      line(cupG,[[6.41,6.72,1.48],[6.41,6.84,1.52],[6.41,6.72,1.58]],"#f7f3ea",2.5);
      const stm=el("g",{class:"steam", "pointer-events":"none"},cupG);
      line(stm,[[6.35,6.55,1.77],[6.38,6.58,1.9],[6.35,6.55,2.02]],"#b9c3be",1.5);
      line(stm,[[6.45,6.6,1.77],[6.48,6.63,1.92],[6.45,6.6,2.04]],"#b9c3be",1.5);
      cupG.addEventListener("click",e=>{ e.stopPropagation(); coffeeBreak(); });
      cupG.addEventListener("keydown",e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); coffeeBreak(); } });
      cupG.addEventListener("mouseenter",()=>cupG.classList.add("lit")); cupG.addEventListener("mouseleave",()=>cupG.classList.remove("lit"));
      cupG.addEventListener("focus",()=>cupG.classList.add("lit")); cupG.addEventListener("blur",()=>cupG.classList.remove("lit"));
      addSortable({x:6.3,y:6.5,w:0.3,d:0.3}, cupG);
      cupG.style.visibility = st.sipping ? "hidden" : "";

      // decoration on the floor
      const lamp=el("g",{"pointer-events":"none"},mid);
      if(P.glow) el("ellipse",{cx:iso(9.55,1.65,0)[0], cy:iso(9.55,1.65,0)[1], rx:46, ry:20, fill:P.glow, opacity:.28},lamp);
      box(lamp,9.5,1.6,0,0.12,0.12,2.6,P.dark); box(lamp,9.2,1.3,2.6,0.7,0.7,0.5,P.glow?"#ffe2a8":"#f2e6c9");
      addSortable({x:9.2,y:1.3,w:0.7,d:0.7},lamp); blockers.push({x:9.2,y:1.3,w:0.7,d:0.7});
      hot("toolkit",[{foot:{x:1.2,y:8.9,w:2.4,d:1.0}, draw:bench=>{   // moved slightly forward, away from the Contact screen
        [[1.25,8.95],[3.45,8.95],[1.25,9.75],[3.45,9.75]].forEach(([x,y])=>box(bench,x,y,0,0.12,0.12,1.0,shade(P.wood,.8)));
        box(bench,1.2,8.9,0.3,2.4,1.0,0.08,P.wood); box(bench,1.2,8.9,1.0,2.4,1.0,0.12,P.wood);
        box(bench,1.7,9.1,1.12,1.4,0.7,0.58,P.coral); box(bench,1.7,9.1,1.7,1.4,0.7,0.08,shade(P.coral,.8));
        line(bench,[[2.05,9.45,1.78],[2.05,9.45,2.05],[2.75,9.45,2.05],[2.75,9.45,1.78]],P.dark,3);
        box(bench,3.2,9.2,1.12,0.08,0.5,0.05,"#9aa3a8"); box(bench,3.18,9.65,1.12,0.12,0.15,0.07,P.coral);
      }}], mid);
      const run=el("g",{"pointer-events":"none"},mid);   // running sneakers on the door mat
      [[1.85,0.4],[2.2,0.5]].forEach(([x,y])=>{
        box(run,x,y,0,0.26,0.72,0.08,"#33404a");                       // white sole
        box(run,x+0.02,y,0.08,0.22,0.3,0.2,"#fbfaf6");                  // heel
        box(run,x+0.02,y+0.3,0.08,0.22,0.22,0.14,"#fbfaf6");            // mid, with laces
        box(run,x+0.02,y+0.52,0.08,0.22,0.2,0.08,"#fbfaf6");            // toe
        line(run,[[x+0.06,y+0.34,0.23],[x+0.18,y+0.34,0.23]],"#33404a",1.4);
        line(run,[[x+0.06,y+0.44,0.23],[x+0.18,y+0.44,0.23]],"#33404a",1.4);
        line(run,[[x+0.24,y+0.08,0.14],[x+0.24,y+0.55,0.14]],"#3b7fc4",2); // side stripe
      });
      addSortable({x:1.85,y:0.4,w:0.61,d:0.82},run); blockers.push({x:1.85,y:0.4,w:0.61,d:0.82});

      sortables.sort((a,b)=>(a.foot.x+a.foot.w/2+a.foot.y+a.foot.d/2)-(b.foot.x+b.foot.w/2+b.foot.y+b.foot.d/2));
      sortables.forEach(s=>mid.appendChild(s.g));
      avatarG=el("g",{"pointer-events":"none"},mid);

      // generous touch targets: a padded transparent box behind each object's drawing
      Object.values(hots).forEach(h=>h.groups.forEach(g=>{
        const bb=g.getBBox(); const r=document.createElementNS(NS,"rect");
        r.setAttribute("x",bb.x-6); r.setAttribute("y",bb.y-6); r.setAttribute("width",bb.width+12); r.setAttribute("height",bb.height+12); r.setAttribute("fill","transparent");
        g.insertBefore(r,g.firstChild);
      }));

      { const [cx,cy]=iso(6.41,6.61,1.52);
        const hit=el("rect",{x:cx-15, y:cy-24, width:30, height:32, fill:"transparent", style:"cursor:pointer", "aria-hidden":"true"},top);
        hit.addEventListener("click",e=>{ e.stopPropagation(); coffeeBreak(); });
        hit.addEventListener("mouseenter",()=>cupG.classList.add("lit")); hit.addEventListener("mouseleave",()=>cupG.classList.remove("lit")); }

      // markers: icon disc on a short stem, anchored to the top centre of the object
      SECTION_ORDER.forEach(key=>{
        const [x,ay]=iso(...ANCHORS[key]), y=ay-26;
        const m=el("g",{class:"marker", tabindex:"0", role:"button", "aria-label":SITE.sections[key].title},top);
        el("line",{x1:x, y1:ay-2, x2:x, y2:y+12, stroke:"#e07a5f", "stroke-width":2, "stroke-linecap":"round"},m);
        el("circle",{cx:x, cy:ay-2, r:2.5, fill:"#e07a5f"},m);
        if(!reduce) el("circle",{cx:x, cy:y, r:12, fill:"none", stroke:"#e07a5f", "stroke-width":2, class:"pulse"},m);
        el("circle",{cx:x, cy:y, r:16, fill:"transparent"},m);
        el("circle",{cx:x, cy:y, r:12, class:"disc"},m);
        const ic=el("g",{class:"ico", transform:`translate(${x} ${y})`},m); ic.innerHTML=ICONS[key];
        const tw=el("g",{class:"tagwrap", "pointer-events":"none"},m);
        const label=SITE.sections[key].menu, w=label.length*6.8+18;
        el("rect",{x:x-w/2, y:y-38, width:w, height:20, rx:6, fill:P.tag},tw);
        const t=el("text",{x, y:y-24, "text-anchor":"middle", "font-size":11.5, "font-family":"Atkinson Hyperlegible, sans-serif", "font-weight":700, fill:P.tagtext},tw); t.textContent=label;
        m.addEventListener("click",()=>pick(key,false));
        m.addEventListener("keydown",e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); pick(key,true); } });
        m.addEventListener("mouseenter",()=>light(key,true)); m.addEventListener("mouseleave",()=>light(key,false));
        m.addEventListener("focus",()=>light(key,true)); m.addEventListener("blur",()=>light(key,false));
        markers[key]=m;
      });
      refresh(); drawAvatar();
    }

    function hot(key, parts, parent){
      hots[key]={groups:[]};
      parts.forEach(p=>{
        const g=el("g",{class:"hot", "aria-hidden":"true"},parent);   // keyboard and screen readers use the marker instead
        p.draw(g); hots[key].groups.push(g);
        g.addEventListener("click",e=>{ e.stopPropagation(); pick(key,false); });
        g.addEventListener("mouseenter",()=>light(key,true)); g.addEventListener("mouseleave",()=>light(key,false));
        if(p.foot){ addSortable(p.foot,g); blockers.push(p.foot); }
      });
    }
    let hovered=null;
    function light(key,on){ hovered = on ? key : (hovered===key ? null : hovered); refresh(); }
    function refresh(){
      Object.entries(hots).forEach(([k,h])=>h.groups.forEach(g=>g.classList.toggle("lit", k===hovered || k===st.current)));
      Object.entries(markers).forEach(([k,m])=>{ m.classList.toggle("sel", k===st.current); m.classList.toggle("lit", k===hovered); m.setAttribute("aria-pressed", k===st.current?"true":"false"); });
    }
    function endSip(){ st.sipping=false; clearTimeout(sipTimer); if(cupG) cupG.style.visibility=""; }
    function coffeeBreak(){
      endSip();
      const s=SPOTS.coffee;
      walkTo(s.x,s.y,s.f,()=>{
        st.sipping=true; if(cupG) cupG.style.visibility="hidden"; drawAvatar();
        const n=addCoffee();
        svg.querySelectorAll(".coffee-count").forEach(t=>{ t.textContent=coffeeLabel(n); });
        if(cupG) cupG.setAttribute("aria-label",`Coffee cup on the desk. Take a coffee break. ${coffeeLabel(n).toLowerCase()} so far.`);
        sipTimer=setTimeout(()=>{ endSip(); drawAvatar(); }, 2600);
      });
    }
    function pick(key){ opts.onPick(key); }
    function setSelected(key){
      endSip();
      const first = st.current===null;
      st.current=key; refresh();
      const s=SPOTS[key];
      if(first){ st.ax=s.x; st.ay=s.y; st.facing=s.f; drawAvatar(); }   // first selection: place, do not walk
      else walkTo(s.x,s.y,s.f);
    }
    function toggleMood(){
      st.mood = st.mood==="day" ? "evening" : "day";
      document.body.classList.toggle("evening", st.mood==="evening");
      build();
    }

    /* ---- walking: quick, and redirectable mid-walk ---- */
    function walkTo(x,y,f,onArrive){
      st.onArrive=onArrive||null;
      let path=findPath(blockers,st.ax,st.ay,x,y);
      if(path.length>1) path.shift();
      if(f) path.push({x,y});
      st.endFacing=f||null;
      if(reduce || !path.length){ const end=path[path.length-1]||{x:st.ax,y:st.ay}; st.ax=end.x; st.ay=end.y; if(f) st.facing=f; st.moving=false; drawAvatar(); if(st.onArrive){ const cb=st.onArrive; st.onArrive=null; cb(); } return; }
      let len=0, px=st.ax, py=st.ay; path.forEach(p=>{ len+=Math.hypot(p.x-px,p.y-py); px=p.x; py=p.y; });
      st.speed=Math.max(4, len/1.2);           // never longer than about 1.2 seconds
      st.path=path; st.moving=true;
      if(!raf){ last=performance.now(); raf=requestAnimationFrame(step); }
    }
    function step(now){
      const dt=Math.min(0.05,(now-last)/1000); last=now;
      let budget=st.speed*dt;
      while(budget>0 && st.path.length){
        const t=st.path[0], dx=t.x-st.ax, dy=t.y-st.ay, d=Math.hypot(dx,dy);
        if(d>0.001) st.facing = Math.abs(dx)>Math.abs(dy) ? (dx>0?"+x":"-x") : (dy>0?"+y":"-y");
        if(d<=budget){ st.ax=t.x; st.ay=t.y; budget-=d; st.path.shift(); }
        else { st.ax+=dx/d*budget; st.ay+=dy/d*budget; budget=0; }
      }
      st.phase+=dt*Math.min(18, 3*st.speed);
      if(!st.path.length){ st.moving=false; if(st.endFacing) st.facing=st.endFacing; if(st.onArrive){ const cb=st.onArrive; st.onArrive=null; drawAvatar(); cb(); } }
      drawAvatar();
      raf = st.moving ? requestAnimationFrame(step) : null;
    }
    function onFloorClick(e){
      const p=svg.createSVGPoint(); p.x=e.clientX; p.y=e.clientY;
      const q=p.matrixTransform(svg.getScreenCTM().inverse());
      const u=q.x/(0.866*S), v=q.y/(0.5*S);
      endSip(); walkTo((u+v)/2,(v-u)/2,null);
    }

    /* ---- avatar ---- */
    const SKIN="#ecc3a4", SKIN2="#d9a988", KNIT="#2f3a2b", KNIT2="#232c20", PANTS="#2b2f36", SHOE="#fbfaf6", EYE="#2b3440", MOUTH="#8a4a3c", ZIP="#cfd3d6";
    function drawAvatar(){   // avatar A: refined blocks
      const behind=f=> f.x+f.w <= st.ax-0.2+0.01 || f.y+f.d <= st.ay-0.2+0.01;
      const firstFront=sortables.find(s=>!behind(s.foot));
      mid.insertBefore(avatarG, firstFront ? firstFront.g : null);
      const g=avatarG; g.textContent="";
      const {ax,ay,facing}=st, along=facing[1], sg=facing[0]==="+"?1:-1;
      const sw=st.moving?Math.sin(st.phase):0, bob=st.moving?Math.abs(Math.cos(st.phase))*0.04:0;
      const B=(offA,offL,z,dA,wL,h,col)=>{ let cx=ax, cy=ay; if(along==="x"){ cx+=sg*offA; cy+=offL; } else { cy+=sg*offA; cx+=offL; }
        const w=along==="x"?dA:wL, d=along==="x"?wL:dA; box(g,cx-w/2,cy-d/2,z,w,d,h,col); };
      const [sx,sy]=iso(ax,ay,0);
      el("ellipse",{cx:sx, cy:sy, rx:12, ry:6, fill:"#000", opacity:.15},g);
      B(-sw*0.12,-0.38,1.0+bob,0.18,0.16,0.7,KNIT); B(-sw*0.12,-0.38,0.88+bob,0.16,0.14,0.13,SKIN);
      B(sw*0.16,-0.14,0.14,0.22,0.22,0.78,PANTS); B(sw*0.16+0.05,-0.14,0,0.34,0.24,0.15,SHOE);
      B(-sw*0.16,0.14,0.14,0.22,0.22,0.78,PANTS); B(-sw*0.16+0.05,0.14,0,0.34,0.24,0.15,SHOE);
      B(0,0,0.9+bob,0.4,0.6,0.82,KNIT);
      B(0,0,1.7+bob,0.3,0.36,0.12,KNIT2);
      if(st.sipping){ B(0.18,0.38,1.3,0.18,0.16,0.45,KNIT); B(0.26,0.38,1.72,0.16,0.14,0.12,SKIN); }
      else { B(sw*0.12,0.38,1.0+bob,0.18,0.16,0.7,KNIT); B(sw*0.12,0.38,0.88+bob,0.16,0.14,0.13,SKIN); }
      B(0,-0.27,1.98+bob,0.12,0.05,0.16,SKIN2);
      B(0,0,1.82+bob,0.5,0.5,0.52,SKIN);
      B(0,0.27,1.98+bob,0.12,0.05,0.16,SKIN2);
      if(sg>0){
        const F=(l,z,o)=> along==="x" ? [ax+o, ay+l, z+bob] : [ax+l, ay+o, z+bob];
        const fo=0.255;
        line(g,[F(0.03,1.8,0.205),F(0.03,1.55,0.205)],ZIP,1.4);
        poly(g,[F(-0.14,2.1,fo),F(-0.07,2.1,fo),F(-0.07,2.17,fo),F(-0.14,2.17,fo)],EYE);
        poly(g,[F(0.07,2.1,fo),F(0.14,2.1,fo),F(0.14,2.17,fo),F(0.07,2.17,fo)],EYE);
        line(g,[F(-0.08,1.98,fo),F(0,1.95,fo),F(0.08,1.98,fo)],MOUTH,1.2);
      }
      if(st.sipping){   // cup in hand, in front of the face, with steam
        B(0.34,0.26,1.78,0.18,0.18,0.2,"#f7f3ea");
        const st2=el("g",{class:"steam"},g); const p=(dl,z)=>along==="x"?[ax+sg*0.34, ay+0.26+dl, z]:[ax+0.26+dl, ay+sg*0.34, z];
        line(st2,[p(-0.04,2.05),p(0,2.18),p(-0.04,2.32)],"#b9c3be",1.5); line(st2,[p(0.06,2.05),p(0.1,2.2),p(0.06,2.35)],"#b9c3be",1.5);
      }
    }

    build();
    return { setSelected, setHover:(key)=>{ hovered=key; refresh(); } };
  }
window.drawRoom = drawRoom;
window.ROOM_ICONS = ICONS;
})();
