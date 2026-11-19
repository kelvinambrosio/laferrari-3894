import { useEffect, useRef, useState } from 'react';
import { Search, X, ArrowUpRight, Box, Image as ImageIcon } from 'lucide-react';
import { catalog, type FerrariCar } from '../lib/catalog';
const normalize=(s:string)=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
export default function CatalogSearch({onClose,onSelect,current}:{onClose:()=>void;onSelect:(car:FerrariCar)=>void;current:string}){
 const dialog=useRef<HTMLDialogElement>(null),input=useRef<HTMLInputElement>(null);
 const [query,setQuery]=useState(''),[category,setCategory]=useState('Todos');
 useEffect(()=>{dialog.current?.showModal();input.current?.focus();const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=previous}},[]);
 const results=catalog.filter(c=>(category==='Todos'||category==='3D disponível'&&c.model||c.family===category)&&normalize('Ferrari '+c.name+' '+c.year+' '+c.engine+' '+c.family).includes(normalize(query.trim())));
 return <dialog ref={dialog} className="catalog-dialog" aria-labelledby="catalog-title" onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget)onClose()}}><div className="catalog-content">
 <div className="catalog-heading"><div><span className="eyebrow">MARANELLO / CATÁLOGO</span><h2 id="catalog-title">Encontre sua <em>Ferrari.</em></h2></div><button className="icon-button" onClick={onClose} aria-label="Fechar pesquisa"><X/></button></div>
 <p className="catalog-intro">Uma seleção de 23 modelos. Fotografia e história para explorar; experiência 360° nos modelos com arquivo 3D disponível.</p>
 <div className="search-field"><Search size={21}/><input ref={input} value={query} onChange={e=>setQuery(e.target.value)} placeholder="Pesquise F40, V12, 1987…" aria-label="Pesquisar modelos Ferrari"/>{query&&<button onClick={()=>{setQuery('');input.current?.focus()}} aria-label="Limpar pesquisa"><X size={18}/></button>}<span>ESC</span></div>
 <div className="catalog-filters">{['Todos','Ícones','Clássicos','Supercarros','Esportivos','Gran Turismo','3D disponível'].map(x=><button key={x} onClick={()=>setCategory(x)} aria-pressed={category===x}>{x}</button>)}</div>
 <div className="result-summary" role="status">{results.length} {results.length===1?'MODELO ENCONTRADO':'MODELOS ENCONTRADOS'}<span>SELECIONE PARA EXPLORAR</span></div>
 <div className="catalog-results">{results.map(car=><button key={car.id} className={'car-result '+(current===car.id?'current':'')} onClick={()=>onSelect(car)} aria-label={'Explorar Ferrari '+car.name}>
  <div className="result-image">{car.image?<img src={car.image} alt={'Ferrari '+car.name} loading="lazy"/>:<span>{car.name}</span>}</div><div className="result-info"><small>{car.year} · {car.family}</small><h3>Ferrari {car.name}</h3><p>{car.engine} · {car.liters}</p><span className="availability">{car.model?<><Box size={12}/> EXPERIÊNCIA 3D</>:<><ImageIcon size={12}/> {car.image?'FOTO + HISTÓRIA':'FICHA + HISTÓRIA'}</>}</span></div><div className="result-end">{current===car.id&&<small>EM EXIBIÇÃO</small>}<ArrowUpRight size={20}/></div>
 </button>)}</div>
 {results.length===0&&<div className="empty-search"><Search size={30}/><h3>Nenhuma Ferrari encontrada.</h3><p>Tente outro nome, ano ou motor. Esta seleção não inclui todos os modelos da história da marca.</p><button onClick={()=>{setQuery('');setCategory('Todos')}}>VER TODOS OS 23 MODELOS <ArrowUpRight size={15}/></button></div>}
 <div className="catalog-footnote">Sem arquivo 3D, não simulamos outro carro com o modelo da 458. A disponibilidade está indicada em cada resultado.</div>
 </div></dialog>
}
