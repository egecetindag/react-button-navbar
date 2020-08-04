
import * as React from 'react';
import './select.scss';

const {  useState, useEffect, useRef } = React

const SelectComp: React.FC<{
  currentValue: string
  children: JSX.Element[];
  onSelect: (str: string) => void
}> = ({ currentValue, onSelect,children }) => {

  const outRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedChildren, setChildren] = useState([] as any);
  const [selected, setSelected] = useState<JSX.Element>();
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    if (children && children.constructor === Array){
      setSelected(children.find(c => currentValue === c.props.value ));
      setChildren(children.filter(c => currentValue !== c.props.value));
    }
  },[currentValue]);

  useEffect(() => {
    window.addEventListener("scroll", () => handleScroll());
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleScroll = () =>{
    if(offsetY){}
    setOffsetY((oldOffset: number)=>{
    if(Math.abs(oldOffset  - window.pageYOffset) > 100){
      setOpen(false);
      return window.pageYOffset;
    }
   return oldOffset;});
  
  }

  const useOutsideClick = ( callback: ()=>void) => {
    const handleClick = (e: MouseEvent) => {
      if (outRef && outRef.current && !outRef.current.contains(e.target as Node)) {
        callback();
      }
    };
    useEffect(() => {
      document.addEventListener("click", handleClick);
  
      return () => {
        document.removeEventListener("click", handleClick);
      };
    });
  };

    useOutsideClick( () => {
      setOpen(false);
    });
  return (
    <div ref={outRef} className="home-select">
      <div className="select-group">
        <div className="select-second-border"/>
        <button className="select-button" onClick={()=>setOpen(!open)}>
          <div className="text">{selected ? selected.props.children : ""}</div>
      </button>
      </div>
    <div className={`dropdown-menu ${open? "active" : "hidden"}`}>
      {selectedChildren.map((c: JSX.Element,i:number) => 
        <div key={i} style={open ? {transform:`translateY(${i*42}px)`}:{}} className="dropdown-menu-item">
         <button onClick={
           ()=>{setOpen(false);
           onSelect(c.props.value)
          }
          }
           >
         {c}
         </button>
         </div>
        )}
    </div>
    </div>
  );
}

export const Option: React.FC<{value: string}> = ({ value, children }) => {
  return(
  <div key={value}>{children}</div>
  )
}

export default SelectComp;
