import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Galaxy from './effects/Galaxy';
import TechText from './effects/TechText';
import ReflectiveCard from './effects/ReflectiveCard';
import CrystalizedBall from './effects/CrystalizedBall';
import GlassSurface from './effects/GlassSurface';
const hero=document.querySelector('.hero');
const galaxyMount=document.createElement('div');galaxyMount.className='galaxy-mount';galaxyMount.setAttribute('aria-hidden','true');hero.prepend(galaxyMount);
createRoot(galaxyMount).render(<Galaxy density={1} glowIntensity={0.3} flareIntensity={1} starSpeed={0.5} mouseRepulsion clickWarp starColors={[]} hueShift={140} saturation={0} starSize={1} twinkleIntensity={0.3} speed={1} rotationSpeed={0.1} layers={4} direction="forward" repulsionStrength={2} mouseInteraction intro lightMode={false}/>);
function ButtonGlass({button}) {
 const [radius,setRadius]=useState(()=>parseFloat(getComputedStyle(button).borderTopLeftRadius)||38);
 useEffect(()=>{const observer=new ResizeObserver(()=>setRadius(parseFloat(getComputedStyle(button).borderTopLeftRadius)||38));observer.observe(button);return()=>observer.disconnect()},[button]);
 return <GlassSurface width="100%" height="100%" borderRadius={radius} distortionScale={-180} displace={0.5} backgroundOpacity={0.1} borderWidth={0.07} brightness={50} opacity={0.93} blur={11} saturation={1} redOffset={0} greenOffset={10} blueOffset={20} refraction renderer="auto"/>;
}
const mounts=new Map();
function decorate(){
 for(const [button,root] of mounts){if(!button.isConnected){root.unmount();mounts.delete(button)}}
 document.querySelectorAll('button,.primary,header nav a,footer>a:last-child,summary').forEach(button=>{
  if(mounts.has(button))return;
  const mount=document.createElement('span');mount.className='glass-mount';mount.setAttribute('aria-hidden','true');button.classList.add('glass-control');button.prepend(mount);
  const root=createRoot(mount);mounts.set(button,root);
  root.render(<ButtonGlass button={button}/>);
 });
}
let pending=false;new MutationObserver(()=>{if(!pending){pending=true;requestAnimationFrame(()=>{pending=false;decorate()})}}).observe(document.body,{childList:true,subtree:true});decorate();

const ballMount=document.querySelector('#crystal-ball');
if(ballMount)createRoot(ballMount).render(<CrystalizedBall preset="plasma" color="#3b82f6" size={0.7} crackle={0.85} fill={0.5} interactive hoverStrength={0.7} strands={6} flares={0.65} glow={0.9} sparks={0.6} particleCount={15000} motion="rise" particleShape="square" depth={0.6} sway={0.5} twinkle={0.5} haze={0.7} dustSpeed={1} speed={1} intro paused={false}/>);

function TitleTech({text}){return <TechText text={text} fontWeight={700} fontSize={150} reveal="letter" dashLength={4} dashGap={2} specks={15} intro="none" introDuration={2} clickKick guides={false} fontFamily="AtlasYaHei, Microsoft YaHei, sans-serif" letterSpacing={-0.05} accentColor="currentColor" reach={200} softness={0.7} lineStyle="dashed" strokeWidth={1.5} speed={1} bounce={0.4} selection labels color="currentColor" align="center" draggable sweep/>}
const titleMount=document.querySelector('#tech-title');
if(titleMount){
 document.fonts.load('700 64px AtlasYaHei','穿行星河，遇见二十八宿').then(()=>{
  createRoot(titleMount).render(<><span className="tech-title-part"><TitleTech text="穿行星河，"/></span><span className="tech-title-part tech-title-gold"><TitleTech text="遇见二十八宿"/></span></>);
  titleMount.parentElement.classList.add('tech-title-ready');
 }).catch(()=>{});
}

function StarReflection({image,host}){
 const [visible,setVisible]=useState(false);
 useEffect(()=>{const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{rootMargin:'40px'});observer.observe(host);return()=>observer.disconnect()},[host]);
 const art=<img src={image.src} alt={image.alt} loading="lazy" decoding="async" draggable={false}/>;
 return visible?<ReflectiveCard name={image.alt.replace('国风插画','')} role="二十八星宿" webcam={false} tint="#ffffff" metalness={1} roughness={0} blurStrength={1.5} shine={1} glare={0.5} grayscale={1} warp={0.3} warpScale={1} bevel={3} tiltStrength={12} radius={24} enableTilt={false} intro width="100%" height="100%" className="atlas-reflection">{art}</ReflectiveCard>:art;
}
const reflectionMounts=new Map();
function reflectCards(){
 for(const [host,root] of reflectionMounts){if(!host.isConnected){root.unmount();reflectionMounts.delete(host)}}
 document.querySelectorAll('#grid .image-wrap').forEach(host=>{
  if(reflectionMounts.has(host))return;
  const original=host.querySelector('img');if(!original)return;
  const image={src:original.getAttribute('src'),alt:original.alt};
  const mount=document.createElement('span');mount.className='reflection-mount';host.append(mount);host.classList.add('has-reflection');
  const root=createRoot(mount);reflectionMounts.set(host,root);root.render(<StarReflection image={image} host={host}/>);
 });
}
let reflectionPending=false;new MutationObserver(()=>{if(!reflectionPending){reflectionPending=true;requestAnimationFrame(()=>{reflectionPending=false;reflectCards()})}}).observe(document.querySelector('#grid'),{childList:true,subtree:true});reflectCards();
