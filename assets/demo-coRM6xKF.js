import{c as e,n as t,r as n,s as r,t as i,u as a}from"./index-Zbn_enby.js";import{C as o,Cn as s,Ft as c,G as l,Gn as u,It as d,Kn as f,M as p,Pn as m,Qt as h,St as g,W as _,Z as v,a as y,bn as b,c as x,dn as S,g as ee,k as te,n as ne,pn as re,tn as ie,u as ae,wn as oe,yn as C}from"./extends-Dc7XTXKZ.js";import{c as se,d as ce,i as le,l as ue,n as de,r as fe,t as pe,u as me}from"./guangquan01-Drkv4NHN.js";import{n as he,t as ge}from"./OrbitControls-C3ZHoyY4.js";import{Bn as _e,Cn as ve,D as ye,Dt as be,E as xe,Et as Se,Fn as Ce,Jt as we,Ln as w,S as T,T as Te,Un as Ee,Ut as E,a as De,ar as Oe,c as ke,er as Ae,g as je,gt as Me,i as Ne,ir as D,jt as Pe,l as O,ln as Fe,mn as Ie,n as Le,o as Re,pt as ze,qn as Be,r as Ve,rr as He,s as Ue,t as We,tn as k,u as A,w as Ge,y as Ke}from"./sc_outline-B_Z0CAjr.js";import{t as qe}from"./ContactShadows-DYRy72PV.js";import{n as Je,t as Ye}from"./sc_normal_map-BuY7YMaN.js";function Xe(e){if(e){for(var t=[],n=0;n<e.length;n++)t.push(e[n].slice());return t}}function Ze(e,t){var n=e.label,r=t&&t.getTextGuideLine();return{dataIndex:e.dataIndex,dataType:e.dataType,seriesIndex:e.seriesModel.seriesIndex,text:e.label.style.text,rect:e.hostRect,labelRect:e.rect,align:n.style.align,verticalAlign:n.style.verticalAlign,labelLinePoints:Xe(r&&r.shape.points)}}var Qe=[`align`,`verticalAlign`,`width`,`height`,`fontSize`],j=new Ie,M=k(),$e=k();function N(e,t,n){for(var r=0;r<n.length;r++){var i=n[r];t[i]!=null&&(e[i]=t[i])}}var P=[`x`,`y`,`rotation`],et=function(){function e(){this._labelList=[],this._chartViewList=[]}return e.prototype.clearLabels=function(){this._labelList=[],this._chartViewList=[]},e.prototype._addLabel=function(e,t,n,r,i){var a=r.style,o=r.__hostTarget.textConfig||{},s=r.getComputedTransform(),c=r.getBoundingRect().plain();ve.applyTransform(c,c,s),s?j.setLocalTransform(s):(j.x=j.y=j.rotation=j.originX=j.originY=0,j.scaleX=j.scaleY=1),j.rotation=we(j.rotation);var l=r.__hostTarget,u;if(l){u=l.getBoundingRect().plain();var d=l.getComputedTransform();ve.applyTransform(u,u,d)}var f=u&&l.getTextGuideLine();this._labelList.push({label:r,labelLine:f,seriesModel:n,dataIndex:e,dataType:t,layoutOptionOrCb:i,layoutOption:null,rect:c,hostRect:u,priority:u?u.width*u.height:0,defaultAttr:{ignore:r.ignore,labelGuideIgnore:f&&f.ignore,x:j.x,y:j.y,scaleX:j.scaleX,scaleY:j.scaleY,rotation:j.rotation,style:{x:a.x,y:a.y,align:a.align,verticalAlign:a.verticalAlign,width:a.width,height:a.height,fontSize:a.fontSize},cursor:r.cursor,attachedPos:o.position,attachedRot:o.rotation}})},e.prototype.addLabelsOfSeries=function(e){var t=this;this._chartViewList.push(e);var n=e.__model,r=n.get(`labelLayout`);(Ee(r)||Be(r).length)&&e.group.traverse(function(e){if(e.ignore)return!0;var i=e.getTextContent(),a=E(e);i&&!i.disableLabelLayout&&t._addLabel(a.dataIndex,a.dataType,n,i,r)})},e.prototype.updateLayoutConfig=function(e){var t=e.getWidth(),n=e.getHeight();function r(e,t){return function(){me(e,t)}}for(var i=0;i<this._labelList.length;i++){var a=this._labelList[i],o=a.label,s=o.__hostTarget,c=a.defaultAttr,l=void 0;l=Ee(a.layoutOptionOrCb)?a.layoutOptionOrCb(Ze(a,s)):a.layoutOptionOrCb,l||={},a.layoutOption=l;var u=Math.PI/180;s&&s.setTextConfig({local:!1,position:l.x!=null||l.y!=null?null:c.attachedPos,rotation:l.rotate==null?c.attachedRot:l.rotate*u,offset:[l.dx||0,l.dy||0]});var d=!1;if(l.x==null?(o.x=c.x,o.setStyle(`x`,c.style.x)):(o.x=Fe(l.x,t),o.setStyle(`x`,0),d=!0),l.y==null?(o.y=c.y,o.setStyle(`y`,c.style.y)):(o.y=Fe(l.y,n),o.setStyle(`y`,0),d=!0),l.labelLinePoints){var f=s.getTextGuideLine();f&&(f.setShape({points:l.labelLinePoints}),d=!1)}var p=M(o);p.needsUpdateLabelLine=d,o.rotation=l.rotate==null?c.rotation:l.rotate*u,o.scaleX=c.scaleX,o.scaleY=c.scaleY;for(var m=0;m<Qe.length;m++){var h=Qe[m];o.setStyle(h,l[h]==null?c.style[h]:l[h])}if(l.draggable){if(o.draggable=!0,o.cursor=`move`,s){var g=a.seriesModel;a.dataIndex!=null&&(g=a.seriesModel.getData(a.dataType).getItemModel(a.dataIndex)),o.on(`drag`,r(s,g.getModel(`labelLine`)))}}else o.off(`drag`),o.cursor=c.cursor}},e.prototype.layout=function(e){var t=e.getWidth(),n=e.getHeight(),r=[];Ce(this._labelList,function(e){e.defaultAttr.ignore||r.push(Te({},e))});var i=w(r,function(e){return e.layoutOption.moveOverlap===`shiftX`}),a=w(r,function(e){return e.layoutOption.moveOverlap===`shiftY`});ye(i,0,0,t),ye(a,1,0,n);var o=w(r,function(e){return e.layoutOption.hideOverlap});xe(o),Ge(o)},e.prototype.processLabelsOverall=function(){var e=this;Ce(this._chartViewList,function(t){var n=t.__model,r=t.ignoreLabelLineUpdate,i=n.isAnimationEnabled();t.group.traverse(function(t){if(t.ignore&&!t.forceLabelAnimation)return!0;var a=!r,o=t.getTextContent();!a&&o&&(a=M(o).needsUpdateLabelLine),a&&e._updateLabelLine(t,n),i&&e._animateLabels(t,n)})})},e.prototype._updateLabelLine=function(e,t){var n=e.getTextContent(),r=E(e),i=r.dataIndex;if(n&&i!=null){var a=t.getData(r.dataType),o=a.getItemModel(i),s={},c=a.getItemVisual(i,`style`);if(c){var l=a.getVisual(`drawType`);s.stroke=c[l]}var u=o.getModel(`labelLine`);ue(e,se(o),s),me(e,u)}},e.prototype._animateLabels=function(e,t){var n=e.getTextContent(),r=e.getTextGuideLine();if(n&&(e.forceLabelAnimation||!n.ignore&&!n.invisible&&!e.disableLabelAnimation&&!be(e))){var i=M(n),a=i.oldLayout,o=E(e),s=o.dataIndex,c={x:n.x,y:n.y,rotation:n.rotation},l=t.getData(o.dataType);if(a){n.attr(a);var u=e.prevStates;u&&(_e(u,`select`)>=0&&n.attr(i.oldLayoutSelect),_e(u,`emphasis`)>=0&&n.attr(i.oldLayoutEmphasis)),Pe(n,c,t,s)}else if(n.attr(c),!Me(n).valueAnimation){var d=Ae(n.style.opacity,1);n.style.opacity=0,Se(n,{style:{opacity:d}},t,s)}if(i.oldLayout=c,n.states.select){var f=i.oldLayoutSelect={};N(f,c,P),N(f,n.states.select,P)}if(n.states.emphasis){var p=i.oldLayoutEmphasis={};N(p,c,P),N(p,n.states.emphasis,P)}ze(n,s,l,t,t)}if(r&&!r.ignore&&!r.invisible){var i=$e(r),a=i.oldLayout,m={points:r.shape.points};a?(r.attr({shape:a}),Pe(r,{shape:m},t)):(r.setShape(m),r.style.strokePercent=0,Se(r,{style:{strokePercent:1}},t)),i.oldLayout=m}},e}(),F=k();function tt(e){e.registerUpdateLifecycle(`series:beforeupdate`,function(e,t,n){var r=F(t).labelManager;r||=F(t).labelManager=new et,r.clearLabels()}),e.registerUpdateLifecycle(`series:layoutlabels`,function(e,t,n){var r=F(t).labelManager;n.updatedSeries.forEach(function(e){r.addLabelsOfSeries(t.getViewOfSeriesModel(e))}),r.updateLayoutConfig(t),r.layout(t),r.processLabelsOverall()})}var I=a(r());const L=he()(Oe((e,t,n)=>({mapPlayComplete:!1,cloud:!0,bar:!0,rotation:!0,heat:!0,mode:!0,toggle:t=>e(e=>({[t]:!e[t]})),reset:()=>e(n.getInitialState())})));var R=a(t()),nt=i.div`
  position: relative;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`,rt=i.div`
  font-size: 36px;
  letter-spacing: 8px;
  color: #fff;
  text-shadow: 0 8px 10px rgba(255, 145, 0, 0.8);
  font-weight: 700;
  background: linear-gradient(to bottom, #ea580c, #ff9100);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;

  &::after {
    content: "SICHUAN SMART BRAIN";
    display: block;
    font-size: 12px;
    letter-spacing: 12px;
    text-align: center;
    color: rgba(255, 145, 0, 0.6);
    margin-top: -5px;
    -webkit-text-fill-color: rgba(255, 145, 0, 0.6);
  }
`,it=i.svg.attrs({xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 1920 82`,width:`100%`,height:`100%`,preserveAspectRatio:`none`,children:(0,R.jsxs)(R.Fragment,{children:[(0,R.jsxs)(`defs`,{children:[(0,R.jsxs)(`radialGradient`,{id:`radialGradient`,cx:`50%`,cy:`50%`,fx:`100%`,fy:`50%`,r:`50%`,children:[(0,R.jsx)(`stop`,{offset:`0%`,stopColor:`#fff`,stopOpacity:`1`}),(0,R.jsx)(`stop`,{offset:`100%`,stopColor:`#fff`,stopOpacity:`0`})]}),(0,R.jsx)(`mask`,{id:`svgline-1`,children:(0,R.jsx)(`circle`,{r:`100`,cx:`0`,cy:`0`,fill:`url(#radialGradient)`,children:(0,R.jsx)(`animateMotion`,{begin:`0s`,dur:`3s`,path:`M0,60 L620,60 L670,80 L960,80`,rotate:`auto`,keyPoints:`0;1`,keyTimes:`0;1`,repeatCount:`indefinite`})})}),(0,R.jsx)(`mask`,{id:`svgline-2`,children:(0,R.jsx)(`circle`,{r:`100`,cx:`0`,cy:`0`,fill:`url(#radialGradient)`,children:(0,R.jsx)(`animateMotion`,{begin:`0s`,dur:`3s`,path:`M1920,60 L1300,60 L1250,80 L960,80`,rotate:`auto`,keyPoints:`0;1`,keyTimes:`0;1`,repeatCount:`indefinite`})})})]}),(0,R.jsx)(`path`,{d:`M0,0 L1920,0 L1920,60 L1300,60 L1250,80 L670,80 L620,60 L0,60 Z`,fill:`rgb(255, 245, 232)`}),(0,R.jsx)(`path`,{d:`M0,60 L620,60 L670,80 L1250,80 L1300,60 L1920,60`,fill:`none`,stroke:`rgb(234, 88, 12)`,strokeWidth:`1`}),(0,R.jsx)(`path`,{d:`M0,60 L620,60 L670,80 L960,80`,fill:`none`,stroke:`#ff6715`,strokeWidth:`4`,mask:`url(#svgline-1)`}),(0,R.jsx)(`path`,{d:`M1920,60 L1300,60 L1250,80 L960,80`,fill:`none`,stroke:`#ff6715`,strokeWidth:`4`,mask:`url(#svgline-2)`})]})})`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`,at=i.a.attrs({children:(0,R.jsx)(`svg`,{width:`1em`,height:`1em`,viewBox:`0 0 22 22`,version:`1.1`,children:(0,R.jsx)(`g`,{stroke:`none`,strokeWidth:`1`,fill:`none`,fillRule:`evenodd`,children:(0,R.jsx)(`g`,{transform:`translate(-262.000000, -2480.000000)`,fill:`#000000`,children:(0,R.jsx)(`g`,{transform:`translate(252.000000, 2470.000000)`,children:(0,R.jsx)(`path`,{d:`M29.9006449,27.904446 C28.5016932,29.8668872 26.6944882,31.2248797 24.4790301,31.9784237 C24.2211218,32.0272886 24.0325745,31.9931534 23.9133882,31.876018 C23.7942019,31.7588827 23.7346171,31.6119968 23.7346338,31.4353603 L23.7346338,28.3376019 C23.7346338,27.3880159 23.4865017,26.6930482 22.9902375,26.2526987 C23.5347812,26.1938141 24.024319,26.1058042 24.458851,25.9886688 C24.893383,25.8715335 25.3422785,25.680801 25.8055376,25.4164714 C26.2687966,25.1521418 26.6556591,24.8267354 26.9661251,24.4402521 C27.276591,24.0537688 27.5296112,23.5398222 27.7251857,22.8984123 C27.9207602,22.2570024 28.0185475,21.5203805 28.0185475,20.6885464 C28.0185475,19.504056 27.6414612,18.4959023 26.8872886,17.6640854 C27.240536,16.7733669 27.2023419,15.7752328 26.7727063,14.6696833 C26.5050218,14.5813565 26.1181593,14.6352226 25.6121189,14.8312818 C25.1060784,15.0273409 24.6669591,15.2428141 24.2947609,15.4777015 L23.7502256,15.8300324 C22.8622108,15.5757225 21.9454689,15.4485675 21,15.4485675 C20.0545311,15.4485675 19.1377892,15.5757225 18.2497744,15.8300324 C18.0969813,15.7223001 17.8940788,15.5901353 17.641067,15.433538 C17.3880551,15.2769408 16.9892689,15.0884007 16.4447085,14.8679176 C15.9001481,14.6474346 15.4894467,14.5813479 15.2126043,14.6696576 C14.7921266,15.7758408 14.7588206,16.7739749 15.1126863,17.6640597 C14.3585137,18.4958938 13.9814275,19.5040475 13.9814275,20.6885208 C13.9814275,21.5203548 14.0792147,22.2544676 14.2747892,22.8908591 C14.4703637,23.5272505 14.720944,24.0411971 15.0265302,24.4326988 C15.3321164,24.8242005 15.7165391,25.1521076 16.1797981,25.41642 C16.6430571,25.6807325 17.0919527,25.871465 17.5264847,25.9886174 C17.9610167,26.1057699 18.4505545,26.1937799 18.9950982,26.2526473 C18.6131238,26.60467 18.3790461,27.1085884 18.292865,27.7644025 C18.0924107,27.8621152 17.8775846,27.935404 17.6483866,27.984269 C17.4191886,28.0331339 17.1469167,28.0575663 16.831571,28.0575663 C16.5162253,28.0575663 16.203612,27.9523346 15.8937309,27.7418712 C15.5838499,27.5314078 15.3189144,27.225424 15.0989244,26.8239198 C14.9174043,26.5107253 14.6857747,26.2564154 14.4040358,26.0609899 C14.1222969,25.8655645 13.8860801,25.7481209 13.6953854,25.708659 L13.4084408,25.6644956 C13.2079866,25.6644956 13.069557,25.6864188 12.9931521,25.7302654 C12.9167472,25.7741119 12.8929083,25.8304873 12.9216353,25.8993914 C12.9503623,25.9682956 12.9934529,26.0368829 13.050907,26.1051533 C13.1083611,26.1734238 13.1703941,26.2319915 13.2370061,26.2808564 L13.336924,26.3541538 C13.5471712,26.4518665 13.7549701,26.6378974 13.9603209,26.9122466 C14.1656716,27.1865958 14.3160164,27.4362043 14.4113555,27.661072 L14.554364,27.9983735 C14.67843,28.3704354 14.8886689,28.6714094 15.1850804,28.9012955 C15.481492,29.1311815 15.8014334,29.2780674 16.1449045,29.3419532 C16.4883756,29.405839 16.8202406,29.4399742 17.1404995,29.4443589 C17.4607584,29.4487435 17.7256939,29.4315218 17.935306,29.3926936 L18.2644137,29.3335008 C18.2644137,29.7055627 18.2668619,30.1412107 18.2717584,30.6404447 C18.2766548,31.1396787 18.279103,31.4040083 18.279103,31.4334334 C18.279103,31.6094533 18.21707,31.7563392 18.093004,31.8740912 C17.9689379,31.9918431 17.7779507,32.0259784 17.5200424,31.9764969 C15.3045843,31.22297 13.4973793,29.8649774 12.0984276,27.9025191 C10.6994759,25.9400608 10,23.7305118 10,21.2738721 C10,19.2281225 10.4916769,17.3417791 11.4750308,15.6148418 C12.4583846,13.8879045 13.7928551,12.5202092 15.4784422,11.5117558 C17.1640293,10.5033024 19.0045486,9.99938397 21,10.0000006 C22.9954514,10.0006172 24.8359707,10.5045356 26.5215578,11.5117558 C28.2071449,12.518976 29.5416154,13.8866713 30.5249692,15.6148418 C31.5083231,17.3430123 32,19.2293557 32,21.2738721 C31.9990725,23.7324558 31.2995966,25.9420048 29.9006449,27.904446 Z`})})})})})})`
  position: absolute;
  right: 32px;
  top: 12px;
  width: 36px;
  height: 36px;
  font-size: 36px;
  pointer-events: auto;

  svg {
    display: block;
  }
`;function ot(e){return(0,R.jsxs)(nt,{...e,children:[(0,R.jsx)(it,{}),(0,R.jsx)(rt,{children:`四川省智慧城市数据大脑`}),(0,R.jsx)(at,{href:`https://github.com/knight-L/datav`,target:`_blank`})]})}var st=i.div`
  position: absolute;
  bottom: 0;
  height: 100px;
  width: 100%;
`,ct=i.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: flex-end; /* 按钮底部对齐 */
  gap: 30px;
  z-index: 10;
  padding-bottom: 20px;
`,z=i.button`
  pointer-events: auto;
  position: relative;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(234, 88, 12, 0.2);
  color: #d35400;
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(234, 88, 12, 0.1) 0%,
      transparent 100%
    );
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    transform: translateY(-5px) scale(1.1);
    border-color: #ff6715;
    box-shadow: 0 0 15px rgba(255, 103, 21, 0.4);
    color: #ff6715;
  }

  &:hover::before {
    opacity: 1;
  }

  &.active:hover {
    box-shadow: 0 6px 20px rgba(255, 103, 21, 0.7);
  }

  ${e=>e.$active&&`
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #ff6715 0%, #ff8c00 100%);
        color: white !important;
        border: none;
        box-shadow: 0 4px 15px rgba(255, 103, 21, 0.5);
        margin-bottom: 5px;
    `}
`,lt=()=>(0,R.jsxs)(`svg`,{viewBox:`0 0 1920 100`,preserveAspectRatio:`none`,width:`100%`,height:`100%`,children:[(0,R.jsxs)(`defs`,{children:[(0,R.jsxs)(`linearGradient`,{id:`grad-bottom`,x1:`0%`,y1:`0%`,x2:`0%`,y2:`100%`,children:[(0,R.jsx)(`stop`,{offset:`0%`,stopColor:`#fff5e8`,stopOpacity:`0.5`}),(0,R.jsx)(`stop`,{offset:`100%`,stopColor:`#fff5e8`,stopOpacity:`1`})]}),(0,R.jsx)(`path`,{id:`pulse-path`,d:`M960,100 Q960,40 1300,40`}),(0,R.jsx)(`path`,{id:`pulse-path-left`,d:`M960,100 Q960,40 620,40`})]}),(0,R.jsx)(`path`,{d:`M0,100 H1920 V100 Q1600,100 1450,100 Q1300,80 1200,60 Q960,10 720,60 Q620,80 470,100 Q320,100 0,100 Z`,fill:`url(#grad-bottom)`,stroke:`none`}),(0,R.jsx)(`path`,{d:`M0,100 Q320,100 470,100 Q620,80 720,60 Q960,10 1200,60 Q1300,80 1450,100 Q1600,100 1920,100`,fill:`none`,stroke:`#ff6715`,strokeWidth:`1`,strokeOpacity:`0.4`}),(0,R.jsx)(`path`,{d:`M720,60 Q960,10 1200,60`,fill:`none`,stroke:`#ff6715`,strokeWidth:`2`,strokeLinecap:`round`})]});function ut(e){let{cloud:t,rotation:n,mode:r,heat:i,bar:a,toggle:o}=L();return(0,R.jsxs)(st,{...e,children:[(0,R.jsx)(lt,{}),(0,R.jsxs)(ct,{children:[(0,R.jsx)(z,{$active:t,onClick:()=>o(`cloud`),children:(0,R.jsx)(`svg`,{fill:`currentColor`,viewBox:`0 0 1024 1024`,width:`24`,height:`24`,children:(0,R.jsx)(`path`,{d:`M746.666667 725.333333c59.733333-12.8 106.666667-64 106.666666-128 0-72.533333-55.466667-128-128-128-17.066667 0-29.866667 4.266667-42.666666 8.533334V469.333333c0-93.866667-76.8-170.666667-170.666667-170.666666s-170.666667 76.8-170.666667 170.666666c0 17.066667 4.266667 29.866667 4.266667 46.933334-8.533333-4.266667-17.066667-4.266667-25.6-4.266667C260.266667 512 213.333333 558.933333 213.333333 618.666667S260.266667 725.333333 320 725.333333h426.666667z m0 85.333334h-426.666667C213.333333 810.666667 128 725.333333 128 618.666667c0-85.333333 55.466667-157.866667 128-183.466667C273.066667 311.466667 379.733333 213.333333 512 213.333333c110.933333 0 209.066667 72.533333 243.2 170.666667 102.4 12.8 183.466667 102.4 183.466667 213.333333s-85.333333 200.533333-192 213.333334z`})})}),(0,R.jsx)(z,{$active:n,onClick:()=>o(`rotation`),children:(0,R.jsx)(`svg`,{fill:`currentColor`,viewBox:`0 0 1024 1024`,width:`24`,height:`24`,children:(0,R.jsx)(`path`,{d:`M492.416 658.176L230.826667 504.32V196.565333L492.373333 42.666667l261.589334 153.898666v307.754667l-261.589334 153.856z m200.064-184.661333V276.565333l-169.301333 103.296v197.888l169.301333-104.234666z m-400.128 0l169.301333 104.192V370.816L292.352 269.354667v204.16z m200.064-369.28L316.672 212.352l179.2 107.306667h6.912l170.624-104.149334-180.992-111.274666zM569.344 858.24L430.848 981.333333v-96.213333C194.901333 864.298667 0 750.208 0 612.053333c0-62.250667 36.949333-119.466667 98.389333-165.632l40.533334 42.666667c-48.64 34.858667-77.354667 77.184-77.354667 122.922667 0 105.813333 167.424 193.365333 369.28 211.541333V735.146667l138.496 123.093333zM646.314667 813.056c161.834667-30.976 276.949333-109.226667 276.949333-201.045333 0-51.2-35.882667-98.218667-95.616-135.168l42.453333-42.453334c71.552 48.128 114.730667 110.037333 114.730667 177.621334 0 122.709333-142.037333 226.645333-338.517333 262.997333v-61.952z`})})}),(0,R.jsx)(z,{$active:r,onClick:()=>o(`mode`),children:(0,R.jsx)(`svg`,{fill:`currentColor`,viewBox:`0 0 1024 1024`,width:`24`,height:`24`,children:(0,R.jsx)(`path`,{d:`M874.666667 21.333333l47.509333 101.824L1024 170.666667l-101.824 47.509333L874.666667 320l-47.509334-101.824L725.333333 170.666667l101.824-47.509334zM512 21.333333l156.138667 334.528L1002.666667 512l-334.528 156.138667L512 1002.666667l-156.138667-334.528L21.333333 512l334.528-156.138667L512 21.333333z m107.968 382.698667L512 172.650667l-107.968 231.381333L172.650667 512l231.381333 107.968 107.946667 231.36 107.989333-231.36L851.328 512l-231.36-107.946667z`})})}),(0,R.jsx)(z,{$active:i,onClick:()=>o(`heat`),children:(0,R.jsx)(`svg`,{fill:`currentColor`,viewBox:`0 0 1024 1024`,width:`24`,height:`24`,children:(0,R.jsx)(`path`,{d:`M781.981888 1014.033538C649.277769 945.497049 431.312619 990.61918 298.608501 972.93895 165.904382 955.25872 80.23377 832.725854 35.111639 706.301971-80.32183 383.00634 113.136746 295.287826 270.483965 302.387223 427.899447 309.691411 362.093496 148.180122 582.720919 27.558632 803.348343-93.062859 862.874059 217.126192 838.367485 287.574057 813.792648 358.021923 796.863316 425.32967 963.357836 601.858915 1129.852355 778.456422 914.686006 1082.706555 781.981888 1014.033538ZM891.408175 606.432565C745.66574 458.778754 743.413046 396.044657 768.397464 329.692597 789.900446 272.214785 777.886081 13.22331 589.478999 113.229243 401.071917 213.30344 457.730569 374.746465 324.207289 370.650659 190.615746 366.554852 7.601475 440.279363 102.28286 701.250477 139.281642 803.236049 225.976205 884.810855 338.474347 897.644381 450.972489 910.54617 634.259813 878.735409 746.211847 932.868314 858.163882 987.069481 1031.0069 747.874403 891.408175 606.432565ZM650.09693 792.51869C581.014333 766.646848 565.723324 679.337914 586.270618 607.388253 606.886175 535.302065 543.947288 435.773976 514.730537 379.866222 485.58205 323.753678 553.708959 197.671113 626.068201 178.352561 743.549573 146.95138 684.365175 331.7405 689.280142 455.092528 694.331636 578.444556 870.314773 658.79062 868.47166 734.28998 866.628548 809.789339 719.111263 818.458796 650.09693 792.51869ZM471.997627 693.058865C411.379696 748.01093 334.105487 776.886363 255.943853 750.604941 177.918747 724.255255 125.902009 596.124786 186.519939 541.991882 310.076758 431.541643 323.04681 547.179903 423.803641 498.098493 524.492209 449.085346 532.547294 638.106799 471.997627 693.058865Z`})})}),(0,R.jsx)(z,{$active:a,onClick:()=>o(`bar`),children:(0,R.jsx)(`svg`,{fill:`currentColor`,viewBox:`0 0 1024 1024`,width:`24`,height:`24`,children:(0,R.jsx)(`path`,{d:`M211.176727 809.425455a34.909091 34.909091 0 0 1-34.909091-34.909091V367.522909a34.909091 34.909091 0 0 1 69.818182 0v406.993455a34.909091 34.909091 0 0 1-34.909091 34.909091z m329.821091-34.909091V90.298182a34.909091 34.909091 0 0 0-69.818182 0v684.218182a34.909091 34.909091 0 0 0 69.818182 0z m289.000727 0V367.522909a34.909091 34.909091 0 0 0-69.818181 0v406.993455a34.909091 34.909091 0 0 0 69.818181 0zM977.454545 933.701818a34.909091 34.909091 0 0 0-34.90909-34.909091H81.454545a34.909091 34.909091 0 0 0 0 69.818182h861.09091a34.909091 34.909091 0 0 0 34.90909-34.909091z`})})})]})]})}var B={成都市:{population:2e3,gdp:`1.8万亿`,area:`14335平方公里`},绵阳市:{population:500,gdp:`3500亿`,area:`11234平方公里`},德阳市:{population:400,gdp:`2800亿`,area:`5951平方公里`},乐山市:{population:350,gdp:`2200亿`,area:`12723平方公里`},眉山市:{population:300,gdp:`1800亿`,area:`7148平方公里`},广安市:{population:320,gdp:`1500亿`,area:`6344平方公里`},南充市:{population:700,gdp:`2600亿`,area:`12479平方公里`},达州市:{population:600,gdp:`2300亿`,area:`16588平方公里`},遂宁市:{population:300,gdp:`1600亿`,area:`5321平方公里`},广元市:{population:250,gdp:`1200亿`,area:`16314平方公里`},内江市:{population:400,gdp:`1700亿`,area:`5385平方公里`},资阳市:{population:250,gdp:`900亿`,area:`7962平方公里`},自贡市:{population:300,gdp:`1500亿`,area:`4372平方公里`},攀枝花市:{population:120,gdp:`1200亿`,area:`7440平方公里`},泸州市:{population:500,gdp:`2400亿`,area:`12240平方公里`},宜宾市:{population:550,gdp:`3200亿`,area:`13283平方公里`},巴中市:{population:300,gdp:`800亿`,area:`12289平方公里`},雅安市:{population:150,gdp:`750亿`,area:`15000平方公里`},甘孜藏族自治州:{population:120,gdp:`450亿`,area:`153000平方公里`},凉山彝族自治州:{population:500,gdp:`1700亿`,area:`60400平方公里`},阿坝藏族羌族自治州:{population:90,gdp:`400亿`,area:`84200平方公里`}},V=[`#fbdf88`,`#ea580c`],dt=Object.keys(B),H=Array.from({length:5},(e,t)=>({name:dt[t],value:B[dt[t]].population}));function ft(){return(0,R.jsx)(T,{use:[fe,A,O,tt],option:{grid:{top:0,bottom:0,left:`8%`,right:`12%`},xAxis:{show:!1},yAxis:{axisLine:{show:!1},axisTick:{show:!1},axisLabel:{fontSize:14,margin:16,inside:!1,verticalAlign:`middle`,color:`#000000`,formatter:(e,t)=>`{a|NO.${++t}} ${e}`,rich:{a:{color:`rgba(0, 0, 0,0.6)`}}},data:H.map(e=>e.name),type:`category`,inverse:!0,animationDuration:300,animationDurationUpdate:300},series:[{type:`bar`,data:H.map(e=>e.value),realtimeSort:!0,barWidth:8,itemStyle:{borderRadius:4,color:{type:`linear`,x:1,y:0,x2:0,y2:0,colorStops:V.map((e,t)=>({offset:t,color:e})),global:!1}},showBackground:!0,backgroundStyle:{borderRadius:4},label:{show:!0,color:`rgba(0, 0, 0,0.8)`,valueAnimation:!0,fontSize:16,fontWeight:`bold`},labelLayout:e=>({x:`100%`,y:e.rect.y+e.rect.height/2,verticalAlign:`middle`,align:`right`})},{name:`dot`,type:`pictorialBar`,symbol:`circle`,symbolSize:16,z:12,itemStyle:{color:V[0],shadowColor:V[0],shadowBlur:10},data:H.map(e=>({value:e.value,symbolPosition:`end`}))}],animationDuration:0,animationDurationUpdate:1e3,animationEasing:`linear`,animationEasingUpdate:`linear`}})}var U=[`#fbdf88`,`#ea580c`],pt={type1:`今年同期`,type2:`去年同期`},W=[[],[],[]];for(let e=0;e<30;e++)W[0].push(`${e+1}`.padStart(2,`0`)),W[1].push(Math.round(e*Math.random()*1e3)),W[2].push(Math.round(e*Math.random()*1050));function mt(){let e=(0,I.useRef)(null),t=(0,I.useRef)(0);return De(()=>{e.current&&(e.current?.dispatchAction({type:`dataZoom`,startValue:t.current,endValue:t.current+8}),t.current=(t.current+1)%(W[0].length-8))},2e3),(0,R.jsx)(T,{ref:e,use:[Ke,O,A,Ue,Re,ke],option:{tooltip:{trigger:`axis`,axisPointer:{type:`shadow`},textStyle:{color:`rgba(0, 0, 0,0.8)`},backgroundColor:`rgba(255, 245, 232,0.8)`,borderColor:U[1],borderWidth:1,borderRadius:8},grid:{top:16,bottom:16,left:16,right:16,outerBoundsMode:`same`},legend:{right:16,top:0,data:Object.values(pt).map((e,t)=>({name:e,value:2e3,icon:`none`,textStyle:{color:U[t]}}))},calculable:!0,xAxis:{type:`category`,boundaryGap:!1,axisLine:{lineStyle:{color:`rgba(0, 0, 0, 0.1)`}},axisLabel:{interval:0,color:`rgba(0, 0, 0, 0.6)`},splitLine:{show:!1},axisTick:{show:!1},data:W[0]},yAxis:{type:`value`,axisLabel:{interval:0,color:`rgba(0, 0, 0, 0.6)`},splitLine:{show:!1},axisLine:{show:!0,lineStyle:{color:`rgba(0, 0, 0, 0.1)`}}},dataZoom:{type:`slider`,show:!1,realtime:!0,startValue:0,endValue:8},series:[{name:`今年同期`,type:`line`,symbol:`none`,smooth:!0,itemStyle:{color:U[0]},areaStyle:{color:{type:`linear`,x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:U[0]},{offset:1,color:`rgba(255,255,255,0.1)`}],global:!1}},markPoint:{symbol:`rect`,symbolSize:[50,20],symbolOffset:[0,-10],label:{color:`#ffffff`},data:[{type:`max`,name:`最大值`}]},data:W[1]},{name:`去年同期`,type:`line`,symbol:`none`,smooth:!0,itemStyle:{color:U[1]},areaStyle:{color:{type:`linear`,x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:U[1]},{offset:1,color:`rgba(255,255,255,0.1)`}],global:!1}},markPoint:{symbol:`rect`,symbolSize:[50,20],symbolOffset:[0,-10],label:{color:`#ffffff`},data:[{type:`max`,name:`最大值`}]},data:W[2]}]}})}var ht=Object.keys(B);function gt(){return(0,R.jsx)(Ne,{rowHeight:50,styles:{header:{color:`rgba(0, 0, 0, 0.6)`},body:{color:`#000000`}},column:[{title:`省份`,dataIndex:`value1`,noScroll:!0},{title:`专利编号`,dataIndex:`value2`,align:`center`,noScroll:!0},{title:`处罚金额`,dataIndex:`value3`,align:`right`,noScroll:!0},{title:`同比百分比`,dataIndex:`value4`,align:`right`,noScroll:!0}],data:Array.from({length:ht.length},(e,t)=>{let n=Math.random()*100;return{value1:ht[t],value2:`ZL${Math.round(Math.random()*1e7)}`,value3:(Math.random()*1e3).toLocaleString(`zh-CN`,{maximumFractionDigits:2}),value4:(0,R.jsx)(`span`,{style:{color:n>90?`#fbdf88`:n>60?`#ffa800`:`#ea580c`},children:n.toLocaleString(`zh-CN`,{maximumFractionDigits:2}).concat(`%`)})}})})}var G=[`#fbdf88`,`#ea580c`],_t=[270,400,380,420,300,410,400,330,210,290],vt=i.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: 2fr repeat(2, minmax(0, 1fr));
  gap: 16px;
`,yt=i.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`,bt=i.div`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.7);
`,xt=i(de)`
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-size: 28px;
  font-weight: 600;
  color: #ea580c;

  &::after {
    content: "亿万元";
    display: inline-block;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.7);
    font-weight: normal;
  }
`,St=i.div`
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.8);
`,Ct=i(de)`
  font-size: 20px;
  font-weight: 600;
  margin-left: 16px;
  color: #ea580c;
`,wt=i.svg.attrs({viewBox:`0 0 1024 1024`,width:`1em`,height:`1em`,fill:G[0],children:(0,R.jsx)(`path`,{d:`M597.479619 154.063238V852.358095h52.150857V320.658286l169.252572 58.88a56.32 56.32 0 0 1 25.795047 42.959238l0.170667 4.388571V852.358095H902.095238V926.47619H121.904762v-74.093714h56.953905v-566.613333c0-19.456 10.166857-37.546667 26.843428-47.85981l304.444953-131.705904c38.034286-23.503238 87.332571 3.510857 87.332571 47.859809zM471.771429 482.816l-167.107048 68.266667v80.115809l167.107048-68.242286v-80.14019z m0-175.225905L304.664381 377.904762v80.530286l167.107048-70.339048v-80.457143z`})})`
  vertical-align: middle;
  margin-right: 4px;
`;function Tt(){return(0,R.jsxs)(vt,{children:[(0,R.jsx)(T,{use:[Ke],option:{tooltip:{trigger:`axis`,axisPointer:{type:`shadow`},textStyle:{color:`rgba(0, 0, 0,0.8)`},backgroundColor:`rgba(255, 245, 232,0.8)`,borderColor:G[1],borderWidth:1,borderRadius:8},grid:{top:16,bottom:16,left:16,right:16,outerBoundsMode:`same`},calculable:!0,xAxis:{show:!1,data:_t,boundaryGap:!1},yAxis:{show:!1,type:`value`},series:{name:`series1`,type:`line`,symbol:`none`,itemStyle:{color:G[0]},areaStyle:{color:{type:`linear`,x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:G[0]},{offset:1,color:`rgba(255,255,255,0.1)`}],global:!1}},data:_t}}}),(0,R.jsxs)(yt,{children:[(0,R.jsx)(bt,{children:`收益总计`}),(0,R.jsx)(xt,{value:99608,options:{minimumFractionDigits:2,maximumFractionDigits:2}})]}),Array.from({length:4},(e,t)=>(0,R.jsxs)(St,{children:[(0,R.jsx)(wt,{}),`企业数量`,(0,R.jsx)(Ct,{value:7792,options:{maximumFractionDigits:0}})]},t))]})}var K=[`#fbdf88`,`#ffa800`,`#ff5b00`,`#ff3000`],Et=[{name:`第一季度`,value:20},{name:`第二季度`,value:10},{name:`第三季度`,value:30},{name:`第四季度`,value:40}].reduce((e,t,n)=>(e?.push({value:t.value,name:t.name,itemStyle:{borderRadius:10,shadowBlur:20,color:K[n],shadowColor:K[n]}},{value:2,name:``,itemStyle:{color:`rgba(0, 0, 0, 0)`,borderColor:`rgba(0, 0, 0, 0)`,borderWidth:0}}),e),[]);function Dt(){return(0,R.jsx)(T,{use:[le,O,Ue],option:{color:K[0],tooltip:{show:!1},legend:{icon:`circle`,orient:`vertical`,data:[`第一季度`,`第二季度`,`第三季度`,`第四季度`],top:`middle`,right:`10%`,textStyle:{color:`#000000`},itemGap:20},series:{name:``,type:`pie`,center:[`30%`,`50%`],radius:[70,80],label:{show:!1},labelLine:{show:!1},data:Et}}})}var Ot=[3e3,2e3,4e3,5e3,4500],kt=[`#fbdf88`,`#ea580c`],At=[`50万以下`,`50～100万`,`100～500万`,`500～1000万`,`1000万以上`];function jt(){let e=(0,I.useRef)(null),t=(0,I.useRef)(0);return De(()=>{e.current&&(e.current?.dispatchAction({type:`showTip`,seriesIndex:0,dataIndex:t.current}),t.current=(t.current+1)%Ot.length)},3e3,!0),(0,R.jsx)(T,{ref:e,use:[je,O,A],option:{tooltip:{trigger:`axis`,backgroundColor:`rgba(255, 245, 232,0.8)`,borderColor:kt[1],borderWidth:1,borderRadius:8,textStyle:{color:`rgba(0, 0, 0,0.8)`,fontSize:13,align:`left`},axisPointer:{type:`line`,lineStyle:{width:1,type:`dotted`,color:kt[0]}}},grid:{top:`20%`,bottom:`5%`,left:10,right:10,outerBoundsMode:`same`},xAxis:{type:`category`,axisLine:{lineStyle:{color:`rgba(0, 0, 0, 0.1)`}},axisLabel:{interval:0,color:`rgba(0, 0, 0, 0.6)`},axisTick:{show:!1},data:At},yAxis:{type:`value`,splitLine:{show:!1},axisLine:{show:!1},axisLabel:{color:`rgba(0, 0, 0, 0.6)`},axisTick:{show:!1}},series:[{name:``,type:`bar`,barWidth:30,label:{show:!0,position:`top`,color:`rgba(0, 0, 0, 0.8)`},itemStyle:{borderRadius:[15,15,0,0],color:{type:`linear`,x:0,y:0,x2:0,y2:1,colorStops:kt.map((e,t)=>({offset:t,color:e})),global:!1}},data:Ot}]}})}var Mt=i.div`
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: repeat(6, minmax(0, 1fr));
  gap: 20px;
  padding: 20px;
`,q=i.div`
  position: relative;
  background: rgba(255, 245, 232, 0.65);
  border: 1px solid rgba(255, 145, 0, 0.3);
  position: relative;
  padding: 15px;
  backdrop-filter: blur(4px);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  pointer-events: auto;
  z-index: 9999;

  &::before {
    content: "";
    position: absolute;
    top: -1px;
    left: -1px;
    width: 10px;
    height: 10px;
    border-top: 2px solid #ea580c;
    border-left: 2px solid #ea580c;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -1px;
    right: -1px;
    width: 10px;
    height: 10px;
    border-bottom: 2px solid #ea580c;
    border-right: 2px solid #ea580c;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  &:hover::before,
  &:hover::after {
    width: 100%;
    height: 100%;
    opacity: 0.5;
  }
`,J=i.div`
  font-size: 18px;
  margin-bottom: 10px;
  padding-left: 10px;
  border-left: 4px solid #fdb961;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #5a4a42;

  span {
    font-size: 10px;
    color: rgba(0, 0, 0, 0.4);
    font-weight: normal;
  }
`;function Nt(){let e=D(`toBottom`,.6),t=D(`toRight`,.8,.5),n=D(`toRight`,.8,.6),r=D(`toRight`,.8,.7),i=D(`toLeft`,.8,.5),a=D(`toLeft`,.8,.6),o=D(`toLeft`,.8,.7),s=D(`toTop`,.8,.5);return(0,I.useEffect)(()=>{let c=L.subscribe(e=>e.mapPlayComplete,c=>{c&&(e.restart(),s.restart(),t.restart(),n.restart(),r.restart(),i.restart(),a.restart(),o.restart())}),l=L.subscribe(e=>e.mode,s=>{s?(e.restart(),t.restart(),n.restart(),r.restart(),i.restart(),a.restart(),o.restart()):(e.reverse(),t.reverse(),n.reverse(),r.reverse(),i.reverse(),a.reverse(),o.reverse())});return()=>{c(),l()}},[]),(0,R.jsxs)(He,{children:[(0,R.jsx)(ot,{ref:e.ref}),(0,R.jsxs)(Mt,{children:[(0,R.jsxs)(q,{ref:t.ref,style:{gridArea:`1 / 1 / 3 / 2`},children:[(0,R.jsxs)(J,{children:[`2025年规模指标分析`,(0,R.jsx)(`span`,{children:`INDICATOR ANALYSIS`})]}),(0,R.jsx)(ft,{})]}),(0,R.jsxs)(q,{ref:n.ref,style:{gridArea:`3 / 1 / 5 / 2`},children:[(0,R.jsxs)(J,{children:[`企业税收分析`,(0,R.jsx)(`span`,{children:`TAX ANALYSIS`})]}),(0,R.jsx)(mt,{})]}),(0,R.jsxs)(q,{ref:r.ref,style:{gridArea:`5 / 1 / 7 / 2`},children:[(0,R.jsxs)(J,{children:[`行政处罚信息`,(0,R.jsx)(`span`,{children:`PENALTY INFORMATION`})]}),(0,R.jsx)(gt,{})]}),(0,R.jsxs)(q,{ref:i.ref,style:{gridArea:`1 / 4 / 3 / 5`},children:[(0,R.jsxs)(J,{children:[`企业收益总数统计`,(0,R.jsx)(`span`,{children:`REVENUE STATISTICS`})]}),(0,R.jsx)(Tt,{})]}),(0,R.jsxs)(q,{ref:a.ref,style:{gridArea:`3 / 4 / 5 / 5`},children:[(0,R.jsxs)(J,{children:[`企业能耗分析`,(0,R.jsx)(`span`,{children:`ENERGY CONSUMPTION ANALYSIS`})]}),(0,R.jsx)(Dt,{})]}),(0,R.jsxs)(q,{ref:o.ref,style:{gridArea:`5 / 4 / 7 / 5`},children:[(0,R.jsxs)(J,{children:[`企业税收分析`,(0,R.jsx)(`span`,{children:`TAX ANALYSIS`})]}),(0,R.jsx)(jt,{})]})]}),(0,R.jsx)(ut,{ref:s.ref})]})}function Pt(){let e=(0,I.useRef)(null);return(0,R.jsxs)(R.Fragment,{children:[(0,R.jsx)(`ambientLight`,{intensity:2}),(0,R.jsx)(`directionalLight`,{ref:e,intensity:12,position:[0,200,20],color:`#fff5e8`})]})}function Y(e,t){return new Promise((n,r)=>{new m().load(e,e=>{t?.(e),n(e)},void 0,r)})}var Ft=Y(`/sc-datav/assets/cloud-CNTXtzoi.png`),It=new c,X=new f,Z=new S,Lt=new f,Rt=new S,Q=new f;const zt=(e,t)=>{e.updateRanges[0]=t};var Bt=(0,I.createContext)(null);const Vt=({children:e,range:t,limit:n=200,frustumCulled:r,...i})=>{let a=(0,I.useRef)(null),o=(0,I.useRef)([]),s=(0,I.useMemo)(()=>new Float32Array(Array.from({length:n},()=>1)),[n]),c=(0,I.useMemo)(()=>new Float32Array(Array.from({length:n},()=>[1,1,1]).flat()),[n]),u=(0,I.use)(Ft),d=0,p=0,m,h=new S,g=new f(0,0,1),_=new f;x((e,t)=>{for(d=e.clock.elapsedTime,It.copy(a.current.matrixWorld).invert(),e.camera.matrixWorld.decompose(Lt,Rt,Q),p=0;p<o.current.length;p++)m=o.current[p],m.ref?.current.matrixWorld.decompose(X,Z,Q),X.add(_.copy(m.position).applyQuaternion(Z).multiply(Q)),Z.copy(Rt).multiply(h.setFromAxisAngle(g,m.rotation+=t*m.rotationFactor)),Q.multiplyScalar(m.volume+(1+Math.sin(d*m.density*m.speed))/2*m.growth),m.matrix.compose(X,Z,Q).premultiply(It),m.dist=X.distanceTo(Lt);for(o.current.sort((e,t)=>t.dist-e.dist),p=0;p<o.current.length;p++)m=o.current[p],s[p]=m.opacity*(m.dist<m.fade-1?m.dist/m.fade:1),a.current.setMatrixAt(p,m.matrix),a.current.setColorAt(p,m.color);a.current.geometry.attributes.cloudOpacity.needsUpdate=!0,a.current.instanceMatrix.needsUpdate=!0,a.current.instanceColor&&(a.current.instanceColor.needsUpdate=!0)}),(0,I.useLayoutEffect)(()=>{let e=Math.min(n,t===void 0?n:t,o.current.length);a.current.count=e,zt(a.current.instanceMatrix,{start:0,count:e*16}),a.current.instanceColor&&zt(a.current.instanceColor,{start:0,count:e*3}),zt(a.current.geometry.attributes.cloudOpacity,{start:0,count:e})});let v=[u.image.width??1,u.image.height??1],y=Math.max(v[0],v[1]);return v=[v[0]/y,v[1]/y],(0,R.jsx)(`group`,{...i,children:(0,R.jsxs)(Bt.Provider,{value:o,children:[e,(0,R.jsxs)(`instancedMesh`,{matrixAutoUpdate:!1,ref:a,args:[void 0,void 0,n],frustumCulled:r,children:[(0,R.jsx)(`instancedBufferAttribute`,{usage:l,attach:`instanceColor`,args:[c,3]}),(0,R.jsx)(`planeGeometry`,{args:[...v],children:(0,R.jsx)(`instancedBufferAttribute`,{usage:l,attach:`attributes-cloudOpacity`,args:[s,1]})}),(0,R.jsx)(`meshLambertMaterial`,{transparent:!0,map:u,depthWrite:!1,onBeforeCompile:e=>{let t=parseInt(`181`.replace(/\D+/g,``))>=154?`opaque_fragment`:`output_fragment`;e.vertexShader=`attribute float cloudOpacity;
               varying float vOpacity;
              `+e.vertexShader.replace(`#include <fog_vertex>`,`#include <fog_vertex>
                 vOpacity = cloudOpacity;
                `),e.fragmentShader=`varying float vOpacity;
              `+e.fragmentShader.replace(`#include <${t}>`,`#include <${t}>
                 gl_FragColor = vec4(outgoingLight, diffuseColor.a * vOpacity);
                `)}})]})]})})},Ht=({opacity:e=1,speed:t=0,bounds:n=[5,1,1],segments:r=20,color:i=`#ffffff`,fade:a=10,volume:o=6,smallestVolume:s=.25,distribute:l,growth:u=4,concentrate:d=`inside`,seed:m=Math.random(),ref:h,...g})=>{function _(){let e=Math.sin(m++)*1e4;return e-Math.floor(e)}let v=(0,I.useContext)(Bt),b=(0,I.useRef)(null),x=(0,I.useId)(),S=(0,I.useMemo)(()=>[...Array(r)].map((e,t)=>({segments:r,bounds:new f(1,1,1),position:new f,uuid:x,index:t,ref:b,dist:0,matrix:new c,color:new p,rotation:t*(Math.PI/r)})),[r,x]);return(0,I.useLayoutEffect)(()=>{S.forEach((c,f)=>{y(c,{volume:o,color:i,speed:t,growth:u,opacity:e,fade:a,bounds:n,density:Math.max(.5,_()),rotationFactor:Math.max(.2,.5*_())*t});let p=l?.(c,f);(p||r>1)&&c.position.copy(c.bounds).multiply(p?.point??{x:_()*2-1,y:_()*2-1,z:_()*2-1});let m=Math.abs(c.position.x),h=Math.abs(c.position.y),g=Math.abs(c.position.z),v=Math.max(m,h,g);c.length=1,m===v&&(c.length-=m/c.bounds.x),h===v&&(c.length-=h/c.bounds.y),g===v&&(c.length-=g/c.bounds.z),c.volume=(p?.volume===void 0?Math.max(Math.max(0,s),d===`random`?_():d===`inside`?c.length:1-c.length):p.volume)*o})},[d,n,a,i,e,u,o,m,r,t]),(0,I.useLayoutEffect)(()=>{let e=S;return v.current=[...v.current,...e],()=>{v.current=v.current.filter(e=>e.uuid!==x)}},[S]),(0,I.useImperativeHandle)(h,()=>b.current,[]),(0,R.jsx)(`group`,{ref:b,...g})},Ut=e=>(0,I.useContext)(Bt)?(0,R.jsx)(Ht,{...e}):(0,R.jsx)(Vt,{children:(0,R.jsx)(Ht,{...e})});function Wt(){let e=(0,I.useRef)(null),t=(0,I.useRef)(null),n=L(e=>e.cloud);return x((n,r)=>{e.current.rotation.y=Math.cos(n.clock.elapsedTime/2)/2,e.current.rotation.x=Math.sin(n.clock.elapsedTime/2)/2,t.current.rotation.y-=r/5}),(0,R.jsxs)(Vt,{ref:e,visible:n,children:[(0,R.jsx)(Ut,{ref:t,bounds:[50,10,10],position:[100,60,20],volume:50,opacity:.5,fade:50}),(0,R.jsx)(Ut,{bounds:[50,10,10],position:[-60,60,60],volume:50,opacity:.5,fade:50})]})}function Gt(e){let{ref:t,args:n,bbox:r,children:i,...a}=e,o=(0,I.useRef)(null);return(0,I.useImperativeHandle)(t,()=>o.current),(0,I.useLayoutEffect)(()=>{let{geometry:e}=o.current,t=e.attributes.position,n=r.max.x-r.min.x,i=r.max.y-r.min.y,a=[],s=0,c=0,l=0,u=0;for(let e=0;e<t.count;e++)s=t.getX(e),c=t.getY(e),l=(s-r.min.x)/n,u=(c-r.min.y)/i,a.push(l,u);e.setAttribute(`uv`,new v(a,2))}),(0,R.jsxs)(`mesh`,{ref:o,...a,children:[(0,R.jsx)(`shapeGeometry`,{attach:`geometry`,args:n}),i]})}var Kt=Gt,qt=i.div`
  background: rgba(255, 245, 232, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 12px 16px;
  color: #656565;
  font-size: 12px;
  pointer-events: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  min-width: 120px;
`,Jt=i.div`
  font-weight: bold;
  margin-bottom: 8px;
  color: #ea580c;
`,$=i.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }
`;function Yt(e){let{ref:t,data:n,position:r}=e,[i,a]=(0,I.useState)(!1);return(0,I.useImperativeHandle)(t,()=>({open:()=>a(!0),close:()=>a(!1)})),i&&(0,R.jsx)(ce,{center:!0,position:r,distanceFactor:100,zIndexRange:[-499],style:{pointerEvents:`none`},children:(0,R.jsxs)(qt,{children:[(0,R.jsx)(Jt,{children:n.city}),(0,R.jsxs)($,{children:[(0,R.jsx)(`span`,{children:`人口:`}),(0,R.jsxs)(`span`,{children:[n.population,`万`]})]}),(0,R.jsxs)($,{children:[(0,R.jsx)(`span`,{children:`GDP:`}),(0,R.jsx)(`span`,{children:n.gdp})]}),(0,R.jsxs)($,{children:[(0,R.jsx)(`span`,{children:`面积:`}),(0,R.jsx)(`span`,{children:n.area})]})]})})}var Xt=Promise.all([Y(pe),Y(`/sc-datav/assets/huiguang-DZ0AatIE.png`,e=>{e.colorSpace=b,e.wrapS=e.wrapT=C})]);function Zt(e){let{position:t,value:n=Math.floor(Math.random()*1e3)+100,children:r,uColor1:i=new p(16506760),uColor2:a=new p(15357964),dir:o=`y`,factor:s=5,max:c=1e3}=e,l={x:1,y:2,z:3},u=(0,I.useRef)(null),d=L(e=>e.bar),[f,m]=(0,I.use)(Xt),h=(0,I.useMemo)(()=>4*s*(n/c),[]);x((e,t)=>{u.current.rotation.z+=t+.02});let g=(0,I.useRef)(null);return(0,I.useEffect)(()=>{let e=[0,60,120],t=new ie;e.forEach((e,n)=>{t.rotation.set(Math.PI/2,Math.PI/180*e,0),t.updateMatrix(),g.current.setMatrixAt(n,t.matrix)}),g.current.instanceMatrix.needsUpdate=!0},[]),(0,R.jsxs)(`group`,{visible:d,position:t,children:[(0,R.jsxs)(`mesh`,{renderOrder:5,position:[0,0,h/2],raycast:()=>null,children:[(0,R.jsxs)(`instancedMesh`,{ref:g,matrixAutoUpdate:!1,args:[void 0,void 0,3],renderOrder:10,"rotation-x":Math.PI/2,raycast:()=>null,children:[(0,R.jsx)(`planeGeometry`,{args:[3.5,h]}),(0,R.jsx)(`meshBasicMaterial`,{transparent:!0,color:a,map:m,opacity:.4,depthWrite:!1,side:2,blending:2})]}),(0,R.jsx)(`boxGeometry`,{args:[.1*s,.1*s,h],translate:[0,0,h/2]}),(0,R.jsx)(`meshBasicMaterial`,{transparent:!0,color:`#ffffff`,opacity:1,depthTest:!1,fog:!1,onBeforeCompile:e=>{e.uniforms={...e.uniforms,uColor1:{value:i},uColor2:{value:a},uDir:{value:l[o]},uSize:{value:h}},e.vertexShader=e.vertexShader.replace(`void main() {`,`
                attribute float alpha;
                varying vec3 vPosition;
                varying float vAlpha;
                void main() {
                  vAlpha = alpha;
                  vPosition = position;
              `),e.fragmentShader=e.fragmentShader.replace(`void main() {`,`
                varying vec3 vPosition;
                varying float vAlpha;
                uniform vec3 uColor1;
                uniform vec3 uColor2;
                uniform float uDir;
                uniform float uSize;

                void main() {
              `),e.fragmentShader=e.fragmentShader.replace(`#include <opaque_fragment>`,`
              #ifdef OPAQUE
              diffuseColor.a = 1.0;
              #endif

              // https://github.com/mrdoob/three.js/pull/22425
              #ifdef USE_TRANSMISSION
              diffuseColor.a *= transmissionAlpha + 0.1;
              #endif
              // vec3 gradient = mix(uColor1, uColor2, vPosition.x / 15.0);
              vec3 gradient = vec3(0.0,0.0,0.0);
              if(uDir==1.0){
                gradient = mix(uColor1, uColor2, vPosition.x/ uSize);
              }else if(uDir==2.0){
                gradient = mix(uColor1, uColor2, vPosition.z/ uSize);
              }else if(uDir==3.0){
                gradient = mix(uColor1, uColor2, vPosition.y/ uSize);
              }
              outgoingLight = outgoingLight * gradient;

              gl_FragColor = vec4( outgoingLight, diffuseColor.a  );
              `)}})]}),(0,R.jsxs)(`mesh`,{renderOrder:6,ref:u,raycast:()=>null,children:[(0,R.jsx)(`planeGeometry`,{args:[5,5]}),(0,R.jsx)(`meshBasicMaterial`,{transparent:!0,color:16777215,map:f,alphaMap:f,opacity:1,depthTest:!1,fog:!1,blending:2})]}),typeof r==`function`?r?.(h):r]})}var Qt=i(ce)`
  pointer-events: none;
  width: max-content;
  display: flex;
  background: #ffffff;
  border: 1px solid currentColor;
  color: #fdb961;
  font-size: 14px;
  padding-inline: 4px;
  border-radius: 4px;
`;function $t(e){let{data:t,bbox:n,depth:r,map:i,normalMap:a}=e,o=(0,I.useRef)(null),c=(0,I.useRef)(null),l=(0,I.useRef)(new f(1,1,1)),[u,d]=(0,I.useMemo)(()=>{let e=t.points.map(e=>new s(e)),n=new oe(e);return[e,n]},[t.points]);return x(()=>{o.current.scale.lerp(l.current,.1)}),(0,R.jsxs)(`group`,{ref:o,onPointerOver:e=>{e.stopPropagation(),l.current.setZ(1.5),c.current.open(),document.body.style.cursor=`pointer`},onPointerOut:()=>{l.current.setZ(1),c.current.close(),document.body.style.cursor=`auto`},children:[(0,R.jsx)(Kt,{"position-z":r+.1,bbox:n,args:[u],children:(0,R.jsx)(`meshStandardMaterial`,{map:i,normalMap:a})}),(0,R.jsxs)(`mesh`,{castShadow:!0,receiveShadow:!0,children:[(0,R.jsx)(`extrudeGeometry`,{args:[u,{depth:r,steps:1,bevelEnabled:!1}]}),(0,R.jsx)(`meshStandardMaterial`,{transparent:!0,opacity:0,metalness:.2,roughness:.5,side:2,color:`#f9f3e7`})]}),(0,R.jsxs)(`lineSegments`,{"position-z":r+.2,raycast:()=>null,children:[(0,R.jsx)(`edgesGeometry`,{args:[d]}),(0,R.jsx)(`lineBasicMaterial`,{transparent:!0,opacity:0,color:`#ffffff`})]}),(0,R.jsx)(Zt,{position:t.cityId,value:B[t.city]?.population??0,children:e=>(0,R.jsxs)(R.Fragment,{children:[(0,R.jsx)(Qt,{center:!0,position:[0,0,e+.2],distanceFactor:100,zIndexRange:[-900],children:t.city}),(0,R.jsx)(Yt,{ref:c,data:{city:t.city,...B[t.city]},position:[0,0,e+7],visible:!1})]})})]})}var en=a(e(((e,t)=>{(function(e,n,r){t!==void 0&&t.exports?t.exports=r():typeof define==`function`&&define.amd?define(r):n[e]=r()})(`h337`,e,function(){var e={defaultRadius:40,defaultRenderer:`canvas2d`,defaultGradient:{.25:`rgb(0,0,255)`,.55:`rgb(0,255,0)`,.85:`yellow`,1:`rgb(255,0,0)`},defaultMaxOpacity:1,defaultMinOpacity:0,defaultBlur:.85,defaultXField:`x`,defaultYField:`y`,defaultValueField:`value`,plugins:{}},t=(function(){var t=function(e){this._coordinator={},this._data=[],this._radi=[],this._min=10,this._max=1,this._xField=e.xField||e.defaultXField,this._yField=e.yField||e.defaultYField,this._valueField=e.valueField||e.defaultValueField,e.radius&&(this._cfgRadius=e.radius)},n=e.defaultRadius;return t.prototype={_organiseData:function(e,t){var r=e[this._xField],i=e[this._yField],a=this._radi,o=this._data,s=this._max,c=this._min,l=e[this._valueField]||1,u=e.radius||this._cfgRadius||n;o[r]||(o[r]=[],a[r]=[]),o[r][i]?o[r][i]+=l:(o[r][i]=l,a[r][i]=u);var d=o[r][i];return d>s?(t?this.setDataMax(d):this._max=d,!1):d<c?(t?this.setDataMin(d):this._min=d,!1):{x:r,y:i,value:l,radius:u,min:c,max:s}},_unOrganizeData:function(){var e=[],t=this._data,n=this._radi;for(var r in t)for(var i in t[r])e.push({x:r,y:i,radius:n[r][i],value:t[r][i]});return{min:this._min,max:this._max,data:e}},_onExtremaChange:function(){this._coordinator.emit(`extremachange`,{min:this._min,max:this._max})},addData:function(){if(arguments[0].length>0)for(var e=arguments[0],t=e.length;t--;)this.addData.call(this,e[t]);else{var n=this._organiseData(arguments[0],!0);n&&(this._data.length===0&&(this._min=this._max=n.value),this._coordinator.emit(`renderpartial`,{min:this._min,max:this._max,data:[n]}))}return this},setData:function(e){var t=e.data,n=t.length;this._data=[],this._radi=[];for(var r=0;r<n;r++)this._organiseData(t[r],!1);return this._max=e.max,this._min=e.min||0,this._onExtremaChange(),this._coordinator.emit(`renderall`,this._getInternalData()),this},removeData:function(){},setDataMax:function(e){return this._max=e,this._onExtremaChange(),this._coordinator.emit(`renderall`,this._getInternalData()),this},setDataMin:function(e){return this._min=e,this._onExtremaChange(),this._coordinator.emit(`renderall`,this._getInternalData()),this},setCoordinator:function(e){this._coordinator=e},_getInternalData:function(){return{max:this._max,min:this._min,data:this._data,radi:this._radi}},getData:function(){return this._unOrganizeData()}},t})(),n=(function(){var e=function(e){var t=e.gradient||e.defaultGradient,n=document.createElement(`canvas`),r=n.getContext(`2d`);n.width=256,n.height=1;var i=r.createLinearGradient(0,0,256,1);for(var a in t)i.addColorStop(a,t[a]);return r.fillStyle=i,r.fillRect(0,0,256,1),r.getImageData(0,0,256,1).data},t=function(e,t){var n=document.createElement(`canvas`),r=n.getContext(`2d`),i=e,a=e;if(n.width=n.height=e*2,t==1)r.beginPath(),r.arc(i,a,e,0,2*Math.PI,!1),r.fillStyle=`rgba(0,0,0,1)`,r.fill();else{var o=r.createRadialGradient(i,a,e*t,i,a,e);o.addColorStop(0,`rgba(0,0,0,1)`),o.addColorStop(1,`rgba(0,0,0,0)`),r.fillStyle=o,r.fillRect(0,0,2*e,2*e)}return n},n=function(e){for(var t=[],n=e.min,r=e.max,i=e.radi,e=e.data,a=Object.keys(e),o=a.length;o--;)for(var s=a[o],c=Object.keys(e[s]),l=c.length;l--;){var u=c[l],d=e[s][u],f=i[s][u];t.push({x:s,y:u,value:d,radius:f})}return{min:n,max:r,data:t}};function r(t){var n=t.container,r=this.shadowCanvas=document.createElement(`canvas`),i=this.canvas=t.canvas||document.createElement(`canvas`);this._renderBoundaries=[1e4,1e4,0,0];var a=getComputedStyle(t.container)||{};i.className=`heatmap-canvas`,this._width=i.width=r.width=t.width||+a.width.replace(/px/,``),this._height=i.height=r.height=t.height||+a.height.replace(/px/,``),this.shadowCtx=r.getContext(`2d`),this.ctx=i.getContext(`2d`),i.style.cssText=r.style.cssText=`position:absolute;left:0;top:0;`,n.style.position=`relative`,n.appendChild(i),this._palette=e(t),this._templates={},this._setStyles(t)}return r.prototype={renderPartial:function(e){e.data.length>0&&(this._drawAlpha(e),this._colorize())},renderAll:function(e){this._clear(),e.data.length>0&&(this._drawAlpha(n(e)),this._colorize())},_updateGradient:function(t){this._palette=e(t)},updateConfig:function(e){e.gradient&&this._updateGradient(e),this._setStyles(e)},setDimensions:function(e,t){this._width=e,this._height=t,this.canvas.width=this.shadowCanvas.width=e,this.canvas.height=this.shadowCanvas.height=t},_clear:function(){this.shadowCtx.clearRect(0,0,this._width,this._height),this.ctx.clearRect(0,0,this._width,this._height)},_setStyles:function(e){this._blur=e.blur==0?0:e.blur||e.defaultBlur,e.backgroundColor&&(this.canvas.style.backgroundColor=e.backgroundColor),this._width=this.canvas.width=this.shadowCanvas.width=e.width||this._width,this._height=this.canvas.height=this.shadowCanvas.height=e.height||this._height,this._opacity=(e.opacity||0)*255,this._maxOpacity=(e.maxOpacity||e.defaultMaxOpacity)*255,this._minOpacity=(e.minOpacity||e.defaultMinOpacity)*255,this._useGradientOpacity=!!e.useGradientOpacity},_drawAlpha:function(e){for(var n=this._min=e.min,r=this._max=e.max,e=e.data||[],i=e.length,a=1-this._blur;i--;){var o=e[i],s=o.x,c=o.y,l=o.radius,u=Math.min(o.value,r),d=s-l,f=c-l,p=this.shadowCtx,m;this._templates[l]?m=this._templates[l]:this._templates[l]=m=t(l,a);var h=(u-n)/(r-n);p.globalAlpha=h<.01?.01:h,p.drawImage(m,d,f),d<this._renderBoundaries[0]&&(this._renderBoundaries[0]=d),f<this._renderBoundaries[1]&&(this._renderBoundaries[1]=f),d+2*l>this._renderBoundaries[2]&&(this._renderBoundaries[2]=d+2*l),f+2*l>this._renderBoundaries[3]&&(this._renderBoundaries[3]=f+2*l)}},_colorize:function(){var e=this._renderBoundaries[0],t=this._renderBoundaries[1],n=this._renderBoundaries[2]-e,r=this._renderBoundaries[3]-t,i=this._width,a=this._height,o=this._opacity,s=this._maxOpacity,c=this._minOpacity,l=this._useGradientOpacity;e<0&&(e=0),t<0&&(t=0),e+n>i&&(n=i-e),t+r>a&&(r=a-t);for(var u=this.shadowCtx.getImageData(e,t,n,r),d=u.data,f=d.length,p=this._palette,m=3;m<f;m+=4){var h=d[m],g=h*4;if(g){var _=o>0?o:h<s?h<c?c:h:s;d[m-3]=p[g],d[m-2]=p[g+1],d[m-1]=p[g+2],d[m]=l?p[g+3]:_}}this.ctx.putImageData(u,e,t),this._renderBoundaries=[1e3,1e3,0,0]},getValueAt:function(e){var t,n=this.shadowCtx.getImageData(e.x,e.y,1,1).data[3],r=this._max,i=this._min;return t=Math.abs(r-i)*(n/255)>>0,t},getDataURL:function(){return this.canvas.toDataURL()}},r})(),r=(function(){var t=!1;return e.defaultRenderer===`canvas2d`&&(t=n),t})(),i={merge:function(){for(var e={},t=arguments.length,n=0;n<t;n++){var r=arguments[n];for(var i in r)e[i]=r[i]}return e}},a=(function(){var n=(function(){function e(){this.cStore={}}return e.prototype={on:function(e,t,n){var r=this.cStore;r[e]||(r[e]=[]),r[e].push((function(e){return t.call(n,e)}))},emit:function(e,t){var n=this.cStore;if(n[e])for(var r=n[e].length,i=0;i<r;i++){var a=n[e][i];a(t)}}},e})(),a=function(e){var t=e._renderer,n=e._coordinator,r=e._store;n.on(`renderpartial`,t.renderPartial,t),n.on(`renderall`,t.renderAll,t),n.on(`extremachange`,function(t){e._config.onExtremaChange&&e._config.onExtremaChange({min:t.min,max:t.max,gradient:e._config.gradient||e._config.defaultGradient})}),r.setCoordinator(n)};function o(){var o=this._config=i.merge(e,arguments[0]||{});if(this._coordinator=new n,o.plugin){var s=o.plugin;if(e.plugins[s]){var c=e.plugins[s];this._renderer=new c.renderer(o),this._store=new c.store(o)}else throw Error(`Plugin '`+s+`' not found. Maybe it was not registered.`)}else this._renderer=new r(o),this._store=new t(o);a(this)}return o.prototype={addData:function(){return this._store.addData.apply(this._store,arguments),this},removeData:function(){return this._store.removeData&&this._store.removeData.apply(this._store,arguments),this},setData:function(){return this._store.setData.apply(this._store,arguments),this},setDataMax:function(){return this._store.setDataMax.apply(this._store,arguments),this},setDataMin:function(){return this._store.setDataMin.apply(this._store,arguments),this},configure:function(e){return this._config=i.merge(this._config,e),this._renderer.updateConfig(this._config),this._coordinator.emit(`renderall`,this._store._getInternalData()),this},repaint:function(){return this._coordinator.emit(`renderall`,this._store._getInternalData()),this},getData:function(){return this._store.getData()},getDataURL:function(){return this._renderer.getDataURL()},getValueAt:function(e){return this._store.getValueAt?this._store.getValueAt(e):this._renderer.getValueAt?this._renderer.getValueAt(e):null}},o})();return{create:function(e){return new a(e)},register:function(t,n){e.plugins[t]=n}}})}))()),tn={type:`FeatureCollection`,features:[{type:`Feature`,id:1,bbox:[101.14831609588276,30.30127542714626,101.14831609588276,30.30127542714626],properties:{gid:1,geometry:`Point`,value:1774},geometry:{type:`Point`,coordinates:[103.931804,30.652329]}},{type:`Feature`,id:2,bbox:[101.02736746416436,27.64908070203335,101.02736746416436,27.64908070203335],properties:{gid:2,geometry:`Point`,value:1197},geometry:{type:`Point`,coordinates:[102.001383,26.633632]}},{type:`Feature`,id:3,bbox:[104.33392524180316,29.97311086661811,104.33392524180316,29.97311086661811],properties:{gid:3,geometry:`Point`,value:1479},geometry:{type:`Point`,coordinates:[104.33392524180316,29.97311086661811]}},{type:`Feature`,id:4,bbox:[98.99350492964813,32.785158578033936,98.99350492964813,32.785158578033936],properties:{gid:4,geometry:`Point`,value:1379},geometry:{type:`Point`,coordinates:[98.99350492964813,32.785158578033936]}},{type:`Feature`,id:5,bbox:[102.96955416403026,30.06956119343569,102.96955416403026,30.06956119343569],properties:{gid:5,geometry:`Point`,value:1479},geometry:{type:`Point`,coordinates:[102.96955416403026,30.06956119343569]}},{type:`Feature`,id:6,bbox:[103.2606730989556,28.019696100412407,103.2606730989556,28.019696100412407],properties:{gid:6,geometry:`Point`,value:1731},geometry:{type:`Point`,coordinates:[103.2606730989556,28.019696100412407]}},{type:`Feature`,id:7,bbox:[103.5379039823876,28.190401377855537,103.5379039823876,28.190401377855537],properties:{gid:7,geometry:`Point`,value:1941},geometry:{type:`Point`,coordinates:[103.5379039823876,28.190401377855537]}},{type:`Feature`,id:8,bbox:[101.4430984865112,32.75692954379533,101.4430984865112,32.75692954379533],properties:{gid:8,geometry:`Point`,value:1394},geometry:{type:`Point`,coordinates:[101.4430984865112,32.75692954379533]}},{type:`Feature`,id:9,bbox:[106.52507877813086,30.463114434065933,106.52507877813086,30.463114434065933],properties:{gid:9,geometry:`Point`,value:1972},geometry:{type:`Point`,coordinates:[106.52507877813086,30.463114434065933]}},{type:`Feature`,id:10,bbox:[100.09168572117146,29.298608503777363,100.09168572117146,29.298608503777363],properties:{gid:10,geometry:`Point`,value:1745},geometry:{type:`Point`,coordinates:[100.09168572117146,29.298608503777363]}},{type:`Feature`,id:11,bbox:[101.2981141485958,29.27537963184546,101.2981141485958,29.27537963184546],properties:{gid:11,geometry:`Point`,value:1284},geometry:{type:`Point`,coordinates:[101.2981141485958,29.27537963184546]}},{type:`Feature`,id:12,bbox:[105.6244061392464,30.7050773995164,105.6244061392464,30.7050773995164],properties:{gid:12,geometry:`Point`,value:1865},geometry:{type:`Point`,coordinates:[105.6244061392464,30.7050773995164]}},{type:`Feature`,id:13,bbox:[102.98982323264352,31.84058074179093,102.98982323264352,31.84058074179093],properties:{gid:13,geometry:`Point`,value:1042},geometry:{type:`Point`,coordinates:[102.98982323264352,31.84058074179093]}},{type:`Feature`,id:14,bbox:[99.09160038153428,29.96250395894041,99.09160038153428,29.96250395894041],properties:{gid:14,geometry:`Point`,value:1458},geometry:{type:`Point`,coordinates:[99.09160038153428,29.96250395894041]}},{type:`Feature`,id:15,bbox:[105.54282893609552,32.35654007890608,105.54282893609552,32.35654007890608],properties:{gid:15,geometry:`Point`,value:1706},geometry:{type:`Point`,coordinates:[105.54282893609552,32.35654007890608]}},{type:`Feature`,id:16,bbox:[105.54546124866404,32.3844167073324,105.54546124866404,32.3844167073324],properties:{gid:16,geometry:`Point`,value:1437},geometry:{type:`Point`,coordinates:[105.54546124866404,32.3844167073324]}},{type:`Feature`,id:17,bbox:[103.58634925327752,28.771884034661117,103.58634925327752,28.771884034661117],properties:{gid:17,geometry:`Point`,value:1194},geometry:{type:`Point`,coordinates:[103.58634925327752,28.771884034661117]}},{type:`Feature`,id:18,bbox:[101.9232289042214,27.540807668678525,101.9232289042214,27.540807668678525],properties:{gid:18,geometry:`Point`,value:1817},geometry:{type:`Point`,coordinates:[101.9232289042214,27.540807668678525]}},{type:`Feature`,id:19,bbox:[104.52078775316298,31.81096876219844,104.52078775316298,31.81096876219844],properties:{gid:19,geometry:`Point`,value:1007},geometry:{type:`Point`,coordinates:[104.52078775316298,31.81096876219844]}},{type:`Feature`,id:20,bbox:[107.47820961277291,31.802593056875537,107.47820961277291,31.802593056875537],properties:{gid:20,geometry:`Point`,value:1034},geometry:{type:`Point`,coordinates:[107.47820961277291,31.802593056875537]}},{type:`Feature`,id:21,bbox:[104.516797046341,29.068328255099956,104.516797046341,29.068328255099956],properties:{gid:21,geometry:`Point`,value:1750},geometry:{type:`Point`,coordinates:[104.516797046341,29.068328255099956]}},{type:`Feature`,id:22,bbox:[106.5350746298744,30.875382478064505,106.5350746298744,30.875382478064505],properties:{gid:22,geometry:`Point`,value:1618},geometry:{type:`Point`,coordinates:[106.5350746298744,30.875382478064505]}},{type:`Feature`,id:23,bbox:[103.987492558076,33.48088841217906,103.987492558076,33.48088841217906],properties:{gid:23,geometry:`Point`,value:1881},geometry:{type:`Point`,coordinates:[103.987492558076,33.48088841217906]}},{type:`Feature`,id:24,bbox:[100.73245058957284,27.807276049526735,100.73245058957284,27.807276049526735],properties:{gid:24,geometry:`Point`,value:1446},geometry:{type:`Point`,coordinates:[100.73245058957284,27.807276049526735]}},{type:`Feature`,id:25,bbox:[102.99861736287248,28.92123421656921,102.99861736287248,28.92123421656921],properties:{gid:25,geometry:`Point`,value:1559},geometry:{type:`Point`,coordinates:[102.99861736287248,28.92123421656921]}},{type:`Feature`,id:26,bbox:[101.82090150554468,31.74276388054201,101.82090150554468,31.74276388054201],properties:{gid:26,geometry:`Point`,value:1445},geometry:{type:`Point`,coordinates:[101.82090150554468,31.74276388054201]}},{type:`Feature`,id:27,bbox:[101.86345211972956,26.331350680984823,101.86345211972956,26.331350680984823],properties:{gid:27,geometry:`Point`,value:1597},geometry:{type:`Point`,coordinates:[101.86345211972956,26.331350680984823]}},{type:`Feature`,id:28,bbox:[98.06413925784226,32.447230222144626,98.06413925784226,32.447230222144626],properties:{gid:28,geometry:`Point`,value:1793},geometry:{type:`Point`,coordinates:[98.06413925784226,32.447230222144626]}},{type:`Feature`,id:29,bbox:[104.08116423555738,32.68475372433608,104.08116423555738,32.68475372433608],properties:{gid:29,geometry:`Point`,value:1513},geometry:{type:`Point`,coordinates:[104.08116423555738,32.68475372433608]}},{type:`Feature`,id:30,bbox:[101.39833798018566,27.68423706409877,101.39833798018566,27.68423706409877],properties:{gid:30,geometry:`Point`,value:1402},geometry:{type:`Point`,coordinates:[101.39833798018566,27.68423706409877]}},{type:`Feature`,id:31,bbox:[101.6196683507003,30.685020682833024,101.6196683507003,30.685020682833024],properties:{gid:31,geometry:`Point`,value:1226},geometry:{type:`Point`,coordinates:[101.6196683507003,30.685020682833024]}},{type:`Feature`,id:32,bbox:[101.13209678736573,28.06832608500508,101.13209678736573,28.06832608500508],properties:{gid:32,geometry:`Point`,value:1597},geometry:{type:`Point`,coordinates:[101.13209678736573,28.06832608500508]}},{type:`Feature`,id:33,bbox:[98.36763051615618,32.98196684307906,98.36763051615618,32.98196684307906],properties:{gid:33,geometry:`Point`,value:1342},geometry:{type:`Point`,coordinates:[98.36763051615618,32.98196684307906]}},{type:`Feature`,id:34,bbox:[101.71385596827598,27.38862744595658,101.71385596827598,27.38862744595658],properties:{gid:34,geometry:`Point`,value:1127},geometry:{type:`Point`,coordinates:[101.71385596827598,27.38862744595658]}},{type:`Feature`,id:35,bbox:[105.50488381481722,30.776941500898477,105.50488381481722,30.776941500898477],properties:{gid:35,geometry:`Point`,value:1266},geometry:{type:`Point`,coordinates:[105.50488381481722,30.776941500898477]}},{type:`Feature`,id:36,bbox:[105.6434832990666,31.62064154204184,105.6434832990666,31.62064154204184],properties:{gid:36,geometry:`Point`,value:1040},geometry:{type:`Point`,coordinates:[105.6434832990666,31.62064154204184]}},{type:`Feature`,id:37,bbox:[106.74804393629324,32.11349311102555,106.74804393629324,32.11349311102555],properties:{gid:37,geometry:`Point`,value:1254},geometry:{type:`Point`,coordinates:[106.74804393629324,32.11349311102555]}},{type:`Feature`,id:38,bbox:[101.08951494411392,27.71957443011253,101.08951494411392,27.71957443011253],properties:{gid:38,geometry:`Point`,value:1671},geometry:{type:`Point`,coordinates:[101.08951494411392,27.71957443011253]}},{type:`Feature`,id:39,bbox:[105.46713727464086,30.393554700025096,105.46713727464086,30.393554700025096],properties:{gid:39,geometry:`Point`,value:1079},geometry:{type:`Point`,coordinates:[105.46713727464086,30.393554700025096]}},{type:`Feature`,id:40,bbox:[99.38017463156596,31.208494149856406,99.38017463156596,31.208494149856406],properties:{gid:40,geometry:`Point`,value:1554},geometry:{type:`Point`,coordinates:[99.38017463156596,31.208494149856406]}},{type:`Feature`,id:41,bbox:[103.33492288902804,28.031639191984738,103.33492288902804,28.031639191984738],properties:{gid:41,geometry:`Point`,value:1017},geometry:{type:`Point`,coordinates:[103.33492288902804,28.031639191984738]}},{type:`Feature`,id:42,bbox:[98.0124661145643,33.536901780958296,98.0124661145643,33.536901780958296],properties:{gid:42,geometry:`Point`,value:1333},geometry:{type:`Point`,coordinates:[98.0124661145643,33.536901780958296]}},{type:`Feature`,id:43,bbox:[104.20893973252174,31.890758505573984,104.20893973252174,31.890758505573984],properties:{gid:43,geometry:`Point`,value:1286},geometry:{type:`Point`,coordinates:[104.20893973252174,31.890758505573984]}},{type:`Feature`,id:44,bbox:[101.7537836171995,29.614885058372963,101.7537836171995,29.614885058372963],properties:{gid:44,geometry:`Point`,value:1206},geometry:{type:`Point`,coordinates:[101.7537836171995,29.614885058372963]}},{type:`Feature`,id:45,bbox:[107.0870448205308,30.763171688186823,107.0870448205308,30.763171688186823],properties:{gid:45,geometry:`Point`,value:1366},geometry:{type:`Point`,coordinates:[107.0870448205308,30.763171688186823]}},{type:`Feature`,id:46,bbox:[103.24498394707254,32.35382893558507,103.24498394707254,32.35382893558507],properties:{gid:46,geometry:`Point`,value:1216},geometry:{type:`Point`,coordinates:[103.24498394707254,32.35382893558507]}},{type:`Feature`,id:47,bbox:[106.4377231137315,31.468191788406067,106.4377231137315,31.468191788406067],properties:{gid:47,geometry:`Point`,value:1941},geometry:{type:`Point`,coordinates:[106.4377231137315,31.468191788406067]}},{type:`Feature`,id:48,bbox:[101.05218239039844,29.30168648087732,101.05218239039844,29.30168648087732],properties:{gid:48,geometry:`Point`,value:1744},geometry:{type:`Point`,coordinates:[101.05218239039844,29.30168648087732]}},{type:`Feature`,id:49,bbox:[101.3802319262363,31.324436067119944,101.3802319262363,31.324436067119944],properties:{gid:49,geometry:`Point`,value:1428},geometry:{type:`Point`,coordinates:[101.3802319262363,31.324436067119944]}},{type:`Feature`,id:50,bbox:[99.10355620017448,31.53149608144728,99.10355620017448,31.53149608144728],properties:{gid:50,geometry:`Point`,value:1121},geometry:{type:`Point`,coordinates:[99.10355620017448,31.53149608144728]}},{type:`Feature`,id:51,bbox:[101.13020292116308,32.47291165664365,101.13020292116308,32.47291165664365],properties:{gid:51,geometry:`Point`,value:1304},geometry:{type:`Point`,coordinates:[101.13020292116308,32.47291165664365]}},{type:`Feature`,id:52,bbox:[100.95580269000396,31.601629891997128,100.95580269000396,31.601629891997128],properties:{gid:52,geometry:`Point`,value:1441},geometry:{type:`Point`,coordinates:[100.95580269000396,31.601629891997128]}},{type:`Feature`,id:53,bbox:[100.09859466451326,31.733300155757036,100.09859466451326,31.733300155757036],properties:{gid:53,geometry:`Point`,value:1664},geometry:{type:`Point`,coordinates:[100.09859466451326,31.733300155757036]}},{type:`Feature`,id:54,bbox:[105.52132977252444,28.259153879091624,105.52132977252444,28.259153879091624],properties:{gid:54,geometry:`Point`,value:1969},geometry:{type:`Point`,coordinates:[105.52132977252444,28.259153879091624]}}]};function nn(e){let{projection:t,size:n=500,...r}=e,i=(0,I.useRef)(null),a=L(e=>e.heat);return(0,I.useEffect)(()=>{let e=document.createElement(`div`);e.style=`position:absolute;top:-9999px;left:-9999px;`,document.body.appendChild(e);let r=en.default.create({container:e,gradient:{.5:`#1fc2e1`,.6:`#24d560`,.7:`#9cd522`,.8:`#f1e12a`,.9:`#ffbf3a`,1:`#ff0000`},blur:1,radius:10,maxOpacity:1,width:n,height:n}),a=en.default.create({container:e,gradient:{0:`black`,1:`white`},radius:10,maxOpacity:1,width:n,height:n}),o=tn.features.map(e=>{let[r=0,i=0]=t(e.geometry.coordinates)??[];return{x:Math.floor(r+n/2),y:Math.floor(i+n/2),value:e.properties.value}}),s=1e3,c=2e3;r.setData({max:s,min:c,data:o}),a.setData({max:s,min:c,data:o});let l=new te(r._renderer.canvas);l.needsUpdate=!0;let u=new te(a._renderer.canvas);return u.needsUpdate=!0,i.current.material.uniforms.heatMap.value=l,i.current.material.uniforms.greyMap.value=u,()=>{a._renderer.canvas.remove(),a._renderer.canvas.remove(),document.body.removeChild(e)}},[]),(0,R.jsx)(`group`,{visible:a,...r,children:(0,R.jsxs)(`mesh`,{ref:i,children:[(0,R.jsx)(`planeGeometry`,{args:[n,n,300,300]}),(0,R.jsx)(`shaderMaterial`,{transparent:!0,side:2,vertexShader:`
            varying vec2 vUv;
            uniform float z_scale;
            uniform sampler2D greyMap;
            void main() {
                vUv = uv;
                vec4 frgColor = texture2D(greyMap, uv);
                float height = z_scale * frgColor.a;
                vec3 transformed = vec3( position.x, position.y, height);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
            }
        `,fragmentShader:`
            #ifdef GL_ES
            precision highp float;
            #endif
            varying vec2 vUv;
            uniform sampler2D heatMap;
            uniform vec3 u_color;//基础颜色
            uniform float u_opacity; // 透明度
            void main() {
                gl_FragColor = vec4(u_color, u_opacity) * texture2D(heatMap, vUv);
            }
        `,uniforms:{heatMap:{value:{value:void 0}},greyMap:{value:{value:void 0}},z_scale:{value:4},u_color:{value:new p(`#ffffff`)},u_opacity:{value:1}}})]})})}var rn=Promise.all([Y(Je,e=>{e.wrapS=e.wrapT=C}),Y(Ye,e=>{e.wrapS=e.wrapT=C})]);function an(e){let{data:t,depth:r=6}=e,i=(0,I.useRef)(null),a=ae(e=>e.camera),[s,c]=(0,I.use)(rn),l=(0,I.useMemo)(()=>Ve().center(t.features[0].properties.centroid).scale(1e3).translate([0,0]),[t]),{regions:f,bbox:p}=(0,I.useMemo)(()=>{let e=[],n=new o,i=e=>{let[t,r]=l(e),i=new u(t,-r);return n.expandByPoint(i),i};return t.features.forEach(t=>{let n=t.geometry.coordinates.reduce((e,t)=>[...e,...t.map(e=>e.map(i))],[]),[a,o]=l(t.properties.centroid??t.properties.center);e.push({city:t.properties.name,cityId:[a,-o,r+.1],points:n})}),{regions:e,bbox:n}},[l,t,r]);return(0,I.useLayoutEffect)(()=>{if(!i.current)return;let e=n.timeline({onComplete:()=>{L.setState({mapPlayComplete:!0})}});return e.to(a.position,{x:60,y:125,z:160,duration:2,ease:`circ.out`}),e.to(i.current.scale,{x:1,y:1,z:1,duration:1,ease:`circ.out`},2),i.current.traverse(t=>{(t instanceof d||t instanceof g)&&e.to(t.material,{opacity:1,duration:1,ease:`circ.out`},2)}),()=>{e.kill()}},[a]),(0,R.jsxs)(`group`,{ref:i,rotation:[-Math.PI/2,0,0],"scale-z":.01,"position-x":20,children:[f.map((e,t)=>(0,R.jsx)($t,{depth:r,bbox:p,data:e,map:s,normalMap:c},t)),(0,R.jsx)(nn,{renderOrder:11,projection:l,"position-z":r+1})]})}var on=Promise.all([Y(`/sc-datav/assets/gaoguang1-DEGqXsnZ.png`,e=>{e.colorSpace=b,e.wrapS=e.wrapT=C,e.repeat.set(1,1)}),Y(`/sc-datav/assets/grid-CwTkbZjd.png`,e=>{e.wrapS=e.wrapT=C,e.repeat.set(80,80)}),Y(`/sc-datav/assets/gridBlack-D2rBj0ur.png`,e=>{e.wrapS=e.wrapT=C,e.repeat.set(80,80)}),Y(`/sc-datav/assets/rotationBorder1-CAivvQWo.png`),Y(`/sc-datav/assets/rotationBorder2-B1TYmmxk.png`)]);function sn(){let e=(0,I.useRef)({uTime:{value:0},uSpeed:{value:10},uWidth:{value:20},uColor:{value:new p(15357964)},uDir:{value:2}}),t=(0,I.useRef)(null),n=(0,I.useRef)(null),r=L(e=>e.rotation),[i,a,o,s,c]=(0,I.use)(on);return x((r,i)=>{e.current.uTime.value+=i*10,e.current.uTime.value>100&&(e.current.uTime.value=0),t.current.rotation.z+=.001,n.current.rotation.z+=-.004}),(0,R.jsxs)(`group`,{visible:r,"rotation-x":-Math.PI/2,"position-y":-.1,children:[(0,R.jsxs)(`mesh`,{children:[(0,R.jsx)(`planeGeometry`,{args:[300,300]}),(0,R.jsx)(`meshBasicMaterial`,{transparent:!0,blending:1,map:i,color:`#fbdf88`})]}),(0,R.jsxs)(`mesh`,{ref:t,"position-z":.1,children:[(0,R.jsx)(`planeGeometry`,{args:[240,240]}),(0,R.jsx)(`meshBasicMaterial`,{transparent:!0,map:s,color:`#fbdf88`,opacity:.2,depthWrite:!1,blending:1})]}),(0,R.jsxs)(`mesh`,{ref:n,"position-z":.1,children:[(0,R.jsx)(`planeGeometry`,{args:[225,225]}),(0,R.jsx)(`meshBasicMaterial`,{transparent:!0,map:c,color:`#fbdf88`,opacity:.4,depthWrite:!1,blending:1})]}),(0,R.jsxs)(`mesh`,{"position-z":.05,children:[(0,R.jsx)(`planeGeometry`,{args:[1e3,1e3]}),(0,R.jsx)(`meshBasicMaterial`,{transparent:!0,map:a,alphaMap:o,color:`#fbdf88`,opacity:.1,depthWrite:!1,blending:1})]}),(0,R.jsxs)(`mesh`,{"position-z":.05,children:[(0,R.jsx)(`planeGeometry`,{args:[1e3,1e3]}),(0,R.jsx)(`meshBasicMaterial`,{transparent:!0,map:a,alphaMap:o,color:`#ea580c`,opacity:.5,depthWrite:!1,blending:1,onBeforeCompile:t=>{t.uniforms={...t.uniforms,...e.current},t.vertexShader=t.vertexShader.replace(`void main() {`,`
                varying vec3 vPosition;
                void main(){
                vPosition = position;
            `),t.fragmentShader=t.fragmentShader.replace(`void main() {`,`
                uniform float uTime;
                uniform float uSpeed;
                uniform float uWidth;
                uniform vec3 uColor;
                uniform float uDir;
                varying vec3 vPosition;
                
                void main(){
            `),t.fragmentShader=t.fragmentShader.replace(`#include <opaque_fragment>`,`
                #ifdef OPAQUE
                diffuseColor.a = 1.0;
                #endif
                
                #ifdef USE_TRANSMISSION
                diffuseColor.a *= material.transmissionAlpha;
                #endif
                
                float r = uTime * uSpeed;
                //光环宽度
                float w = 0.0; 
                if(w>uWidth){
                    w = uWidth;
                }else{
                    w = uTime * 5.0;
                }
                //几何中心点
                vec2 center = vec2(0.0, 0.0); 
                // 距离圆心的距离
                float rDistance = distance(vPosition.xz, center);
                if(uDir==2.0){
                    rDistance = distance(vPosition.xy, center);
                }
                if(rDistance > r && rDistance < r + 2.0 * w) {
                float per = 0.0;
                if(rDistance < r + w) {
                    per = (rDistance - r) / w;
                    outgoingLight = mix(outgoingLight, uColor, per);
                    // 获取0->透明度的插值
                    float alphaV = mix(0.0,diffuseColor.a,per);
                    gl_FragColor = vec4(outgoingLight,  alphaV);
                } else {
                    per = (rDistance - r - w) / w;
                    outgoingLight = mix(uColor, outgoingLight, per);
                    // 获取0->透明度的插值
                    float alphaV = mix(diffuseColor.a,0.0,per);
                    gl_FragColor = vec4(outgoingLight,  alphaV);
                }
                } else {
                    gl_FragColor = vec4(outgoingLight, 0.0);
                }
            `)}})]})]})}var cn=Le,ln=We;function un(){return(0,R.jsxs)(I.Suspense,{fallback:null,children:[(0,R.jsx)(Wt,{}),(0,R.jsx)(an,{data:cn,outlineData:ln}),(0,R.jsx)(sn,{})]})}var dn=i.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;function fn(){return(0,R.jsx)(dn,{children:(0,R.jsxs)(ne,{flat:!0,shadows:!0,camera:{position:[-50,125,250],fov:50,far:2e3,near:1},dpr:[1,2],children:[(0,R.jsx)(`color`,{attach:`background`,args:[`#fff5e8`]}),(0,R.jsx)(Pt,{}),(0,R.jsx)(un,{}),(0,R.jsx)(qe,{opacity:.5,scale:300,blur:.5,resolution:256,color:`#000000`}),(0,R.jsx)(ge,{enablePan:!0,enableZoom:!0,enableRotate:!0,zoomSpeed:.3,minDistance:100,maxDistance:300,maxPolarAngle:1.5})]})})}var pn=i.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;function mn(){return(0,I.useEffect)(()=>L.getState().reset(),[]),(0,R.jsxs)(pn,{children:[(0,R.jsx)(fn,{}),(0,R.jsx)(Nt,{})]})}export{mn as default};