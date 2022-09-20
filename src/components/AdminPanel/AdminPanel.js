import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { loadStat } from '../../redux/actions/movieActions';
import BarChart from '../BarChart/BarChart';
import './AdminPanel.scss';

const  AdminPanel = () =>
 {
   const dispatch = useDispatch();
   const stat = useSelector(state => state.adminReducer.searches);
   useEffect(() => dispatch(loadStat()),[])

   const[searchStats, setSearchStats] = useState({});
   
   useEffect(() =>{
     const searchStat = {}
     stat.length && stat.forEach(s => {
       if(!searchStat[s.searchTerm]){
         searchStat[s.searchTerm] = {
           'Clicked': s.searchType === 'Clicked' ? 1 : 0,
           'Searched': s.searchType === 'Searched' ? 1 : 0
         }
       }
       else{
         searchStat[s.searchTerm][s.searchType]+=1;
       }
     });
     setSearchStats(searchStat);
   }, [stat])

   const findMax = type => {
     let name, count =0;
       Object.keys(searchStats).forEach(searchTerm => {
         let currentCount;
         if(type == 'overall') {
          currentCount = searchStats[searchTerm]['Clicked']+searchStats[searchTerm]['Searched'];
         }
         else{
           currentCount = searchStats[searchTerm][type];
         }
         if(currentCount > count){
           count = currentCount;
           name = searchTerm
         }
       })
       return {name,count};
   }
   const populateTable = () => stat.map(search => <tr><td data-label="search-term">{search.searchTerm}</td>
   <td data-label="searched-by">{search.searchedBy}</td>
   <td data-label="search-type">{search.searchType}</td></tr>)
    return (
      Object.keys(searchStats).length &&
      <div>
        <div style={{display:'flex', justifyContent:'center', margin:'10px 0px'}}>
        {[{heading:'Top Interest',color:'green',type:'overall'},
        {heading:'Top Searched',color:'red',type:'Searched'},
        {heading:'Top Clicked',color:'blue',type:'Clicked'}].map(card => {
    const {name, count}= findMax(card.type);
        return <div class="ui card" style={{margin:'10px !important'}}>
  <div class="content">
  <div style={{fontWeight:'bold', textAlign:'center', fontSize:'20px'}}>{card.heading}</div>
    <div class="meta" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height:'100px'}}>
      <span style={{fontWeight:'bold',fontSize:'85px', color: card.color}}>{count}</span>
    </div>
    <div style={{textAlign:'center'}}>
      {name}
    </div>
  </div>
</div>})}
</div>
     <table class="ui celled table admin-table">
        <thead>
          <tr><th>Movie/Show</th>
          <th>Name</th>
          <th>Type</th>
        </tr></thead>
        <tbody>
        {populateTable()}
        </tbody>
      </table>
      <BarChart
      searchStats={searchStats}
      />
      </div>
    );
}

export default AdminPanel;