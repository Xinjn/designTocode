import React,{useState} from "react"

import "./Home.css"
import "./style.less"
import "./style.scss"
type Props = {}

export default function Home({ }: Props) {
  const [number, setNumer] = useState(1);
  console.log(1);
  
  return <div className="box">我是typescript</div>
}
