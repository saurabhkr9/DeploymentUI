import './Admin.scss';
import { useDispatch } from 'react-redux';
import { PieChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";

import Banner from '../../components/Banner';
import {uiAction} from '../../redux/reducers/ui-slice'
import { useEffect } from 'react';

const data = [
	{
		"group": "TO DO",
		"value": 5
	},
	{
		"group": "In Progress",
		"value": 8
	},
	{
		"group": "Pending",
		"value": 3
	},
	{
		"group": "On Hold",
		"value": 2
	},
	{
		"group": "Rejected",
		"value": 1
	},
	{
		"group": "Done",
		"value": 6
	}
];


const data2 = [
	{
		"group": "TO DO",
		"value": 8
	},
	{
		"group": "In Progress",
		"value": 6
	},
	{
		"group": "Pending",
		"value": 8
	},
	{
		"group": "On Hold",
		"value": 1
	},
	{
		"group": "Rejected",
		"value": 3
	},
	{
		"group": "Done",
		"value": 5
	}
];

const options = {
	"title": "Juniper Tasks",
	"resizable": true,
	"height": "400px"
};
const options2 = {
	"title": "OMV Tasks",
	"resizable": true,
	"height": "400px"
};

export const Admin = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(uiAction.changeTitle("Welcome Admin!"));
      },[ dispatch])

    return (
        <div className="bx--grid bx--grid--full-width">
        <div>
            <Banner />
            </div>
            <div class="bx--row paiCharts">
            <div class="bx--col">
            <PieChart 
        data={data}
        options={options}
        />
            </div>
            <div class="bx--col">
            <PieChart 
        data={data2}
        options={options2}
        />
            </div>
            </div>
            
     </div>
    )
}