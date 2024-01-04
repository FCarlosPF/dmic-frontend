import React,{Component} from "react";
import ReactToPrint from "react-to-print";

export const Impresion: React.FC = () => {

  return (
    <>
        
        <div>
        <ReactToPrint
            trigger={()=>{

                return <button>Print</button>
            }}
            content={()=>this.componentRef}
            documentTitle="print"



        />
            <div className="prueba" ref={el=>(this.componentRef=el)}>
                <h1>Holaaa</h1>
            </div>
        </div>
    </>
  );
};
