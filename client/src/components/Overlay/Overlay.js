import classes from './Overlay.module.css';

export default function Overlay({overlay}){
    return (
        <div className={overlay ? `${classes.main_overlay} ${classes.active}` : `${classes.main_overlay}`}></div>
    )
}