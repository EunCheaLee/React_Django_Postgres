import SimpleTop from './SimpleTop';
import ByChannel from './ByChannel';
import ByYear_SaleProfit from './ByYear_SaleProfit';
import ByYear_categorySales from "./ByYear_categorySales.jsx";
import ByRegion from "./ByRegion.jsx";
import ByPromotion from "./ByPromotion.jsx";

const bodyStyle={
    backgroundColor: "black",
}

const wrapColumnStyle={
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '20px',
    alignItems: 'flex-end'
}

const wrapRowStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: '7px',
    width: '1300px',
    height: '300px',
}

const boxStyles = {
    // backgroundColor: 'grey',
    border: '1px solid grey',
    width: '100%',
    height: '100%',
    borderRadius: '5px',
}

const textStyles = {
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
}

const Main = () => {
    return (
        <>
            <div id="btn">Button</div>
            <div style={wrapColumnStyle}>
                <SimpleTop />
                <div style={wrapRowStyles}>
                    <ByYear_SaleProfit style={boxStyles} />
                    <ByPromotion style={boxStyles} />
                    <ByChannel style={boxStyles}/>
                </div>
                <div style={wrapRowStyles}>
                    <ByRegion style={boxStyles} />
                    <ByYear_categorySales style={boxStyles} />
                </div>
            </div>
        </>
    )
}

export default Main;