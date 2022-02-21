import React from 'react'
import { Link } from 'react-router-dom'

export const CardBox = (props: any) => {
    return (<div className="card_container">
        <div className="card_box">
            {
                (props.link || props.title) && (
                    <div className="card_box_head">
                        <h4 className="card_box_heading">{props.title}</h4>
                        {props.link && <Link className="card_box_link" to={props.link.path}>{props.link.label ? props.link.label : 'Show More'}</Link>}
                    </div>
                )
            }
            <div className={"card_box_body " + (!(props.link || props.title) ? "pt-0" : "")}>
                {props.children}
            </div>
        </div>
    </div >)
}
