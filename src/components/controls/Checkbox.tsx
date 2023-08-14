import {FC,ChangeEvent} from "react";
interface CheckboxProps {

    checked:boolean,
    id:string,
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void

}

const Checkbox:FC<CheckboxProps>=({id,checked=false,onChange})=>{

    return <div className="flex items-center h-5">
    <input id={id} aria-describedby={id} type="checkbox" onChange={onChange} checked={checked} className="w-4 h-4 border border-gray-300 rounded bg-gray-50" />
  </div>
}

export default Checkbox;