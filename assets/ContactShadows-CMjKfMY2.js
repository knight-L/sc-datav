import{s as e,u as t}from"./index-CeBnuHBK.js";import{It as n,M as r,Rt as i,Sn as a,Xn as o,an as s,c,t as l,u}from"./extends-qSam8NLT.js";var d={uniforms:{tDiffuse:{value:null},h:{value:1/512}},vertexShader:`
      varying vec2 vUv;

      void main() {

        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

      }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float h;

    varying vec2 vUv;

    void main() {

    	vec4 sum = vec4( 0.0 );

    	sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;

    	gl_FragColor = sum;

    }
  `},f={uniforms:{tDiffuse:{value:null},v:{value:1/512}},vertexShader:`
    varying vec2 vUv;

    void main() {

      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `,fragmentShader:`

  uniform sampler2D tDiffuse;
  uniform float v;

  varying vec2 vUv;

  void main() {

    vec4 sum = vec4( 0.0 );

    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;

    gl_FragColor = sum;

  }
  `},p=t(e()),m=p.forwardRef(({scale:e=10,frames:t=1/0,opacity:m=1,width:h=1,height:g=1,blur:_=1,near:v=0,far:y=10,resolution:b=512,smooth:x=!0,color:S=`#000000`,depthWrite:C=!1,renderOrder:w,...T},E)=>{let D=p.useRef(null),O=u(e=>e.scene),k=u(e=>e.gl),A=p.useRef(null);h*=Array.isArray(e)?e[0]:e||1,g*=Array.isArray(e)?e[1]:e||1;let[j,M,N,P,F,I,L]=p.useMemo(()=>{let e=new o(b,b),t=new o(b,b);t.texture.generateMipmaps=e.texture.generateMipmaps=!1;let c=new s(h,g).rotateX(Math.PI/2),l=new n(c),u=new i;u.depthTest=u.depthWrite=!1,u.onBeforeCompile=e=>{e.uniforms={...e.uniforms,ucolor:{value:new r(S)}},e.fragmentShader=e.fragmentShader.replace(`void main() {`,`uniform vec3 ucolor;
           void main() {
          `),e.fragmentShader=e.fragmentShader.replace(`vec4( vec3( 1.0 - fragCoordZ ), opacity );`,`vec4( ucolor * fragCoordZ * 2.0, ( 1.0 - fragCoordZ ) * 1.0 );`)};let p=new a(d),m=new a(f);return m.depthTest=p.depthTest=!1,[e,c,u,l,p,m,t]},[b,h,g,e,S]),R=e=>{P.visible=!0,P.material=F,F.uniforms.tDiffuse.value=j.texture,F.uniforms.h.value=e*1/256,k.setRenderTarget(L),k.render(P,A.current),P.material=I,I.uniforms.tDiffuse.value=L.texture,I.uniforms.v.value=e*1/256,k.setRenderTarget(j),k.render(P,A.current),P.visible=!1},z=0,B,V;return c(()=>{A.current&&(t===1/0||z<t)&&(z++,B=O.background,V=O.overrideMaterial,D.current.visible=!1,O.background=null,O.overrideMaterial=N,k.setRenderTarget(j),k.render(O,A.current),R(_),x&&R(_*.4),k.setRenderTarget(null),D.current.visible=!0,O.overrideMaterial=V,O.background=B)}),p.useImperativeHandle(E,()=>D.current,[]),p.createElement(`group`,l({"rotation-x":Math.PI/2},T,{ref:D}),p.createElement(`mesh`,{renderOrder:w,geometry:M,scale:[1,-1,1],rotation:[-Math.PI/2,0,0]},p.createElement(`meshBasicMaterial`,{transparent:!0,map:j.texture,opacity:m,depthWrite:C})),p.createElement(`orthographicCamera`,{ref:A,args:[-h/2,h/2,g/2,-g/2,v,y]}))});export{m as t};