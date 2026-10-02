export const BC=()=>[
{k:'pt',l:'Point No.',t:'pt',core:true},{k:'sec',l:'Section',t:'text',core:true},{k:'mk',l:'Turnout Make',t:'text'},
{k:'dr',l:'Drawing No.',t:'text'},{k:'ty',l:'1:12 / 1:8.5',t:'sel',o:['1:12','1:8.5']},{k:'lay',l:'Date of Laying',t:'date',core:true},
{k:'rep',l:'Date of Replacement',t:'date',core:true},{k:'gmt',l:'Total GMT Passed',t:'gmt',core:true},{k:'rs',l:'Reason of Replacement',t:'text'},
{k:'gr',l:'Gradient (Yes/No)',t:'gr'}];
export const SC=()=>{const c=BC();c[0].l='Switch No.';c.splice(5,0,{k:'hd',l:'LH / RH',t:'sel',o:['LH','RH']});return c};
export const RC=b=>{const c=b.map(x=>({...x,o:[...(x.o||[])]})),i=c.findIndex(x=>x.k==='rep');c.splice(i,0,{k:'rc',l:'Reconditioning Date(s)',t:'multi',core:true});return c};
export function defaultState(){const b={mk:'',dr:'',ty:'1:12',rs:'',gr:'No',gd:'',man:''};return {key:'main',t:{c:{r:[{id:1,pt:'P03C',sec:'NBAA-RI',lay:'2002-10-02',rep:'2015-12-20',prev:0,...b},{id:2,pt:'P03C',sec:'NBAA-RI',lay:'2015-12-20',rep:'',prev:1,...b}],cols:BC()},s:{r:[],cols:SC()},cr:{r:[],cols:RC(BC())},sr:{r:[],cols:RC(SC())}},g:[],o:[],n:3};}
