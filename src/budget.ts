export type Category = {id:string; name:string; limit:number; color:number};
export type Expense = {id:string; categoryId:string; amount:number; note:string; date:string};
export type Month = {budget:number; categories:Category[]; expenses:Expense[]};
export type Data = {version:1; months:Record<string,Month>};
export const KEY = 'moj-budzet-v1';
export const newId = () => Array.from(crypto.getRandomValues(new Uint8Array(16)), b=>b.toString(16).padStart(2,'0')).join('');
export const emptyMonth = ():Month => ({budget:0,categories:[],expenses:[]});
export const today = () => {const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
export const money = (n:number) => new Intl.NumberFormat('pl-PL',{style:'currency',currency:'PLN'}).format(n/100);
export function parseAmount(value:string):number {const normalized=value.trim().replace(',','.'); if(!/^\d{1,9}(\.\d{1,2})?$/.test(normalized)) throw new Error('Wpisz kwotę, np. 125,50 (maks. 2 miejsca po przecinku).'); return Math.round(Number(normalized)*100);}
export const spent = (m:Month,id?:string) => m.expenses.filter(e=>!id||e.categoryId===id).reduce((s,e)=>s+e.amount,0);
export const allocated = (m:Month) => m.categories.reduce((s,c)=>s+c.limit,0);
export function validData(value:unknown):value is Data {
 if(!value||typeof value!=='object') return false;
 const d=value as Data;
 const amount=(n:unknown)=>Number.isSafeInteger(n)&&Number(n)>=0&&Number(n)<=99999999999;
 return d.version===1&&!!d.months&&typeof d.months==='object'&&!Array.isArray(d.months)&&Object.entries(d.months).every(([key,m])=>/^\d{4}-(0[1-9]|1[0-2])$/.test(key)&&m&&amount(m.budget)&&Array.isArray(m.categories)&&Array.isArray(m.expenses)&&m.categories.every(c=>typeof c.id==='string'&&typeof c.name==='string'&&c.name.length>0&&amount(c.limit)&&Number.isInteger(c.color)&&c.color>=0&&c.color<6)&&new Set(m.categories.map(c=>c.id)).size===m.categories.length&&m.expenses.every(e=>typeof e.id==='string'&&m.categories.some(c=>c.id===e.categoryId)&&amount(e.amount)&&e.amount>0&&typeof e.note==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(e.date)&&e.date.startsWith(key)&&!isNaN(Date.parse(e.date)))&&new Set(m.expenses.map(e=>e.id)).size===m.expenses.length);
}
