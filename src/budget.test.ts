import { describe, it, expect } from 'vitest';
import { allocated, emptyMonth, parseAmount, spent, validData, type Month } from './budget';
describe('obliczenia budżetu',()=>{
 it('przelicza polskie kwoty na całkowite grosze',()=>{expect(parseAmount('0,29')).toBe(29);expect(parseAmount('123.45')).toBe(12345);expect(()=>parseAmount('-5')).toThrow();expect(()=>parseAmount('1,234')).toThrow();expect(()=>parseAmount('')).toThrow();});
 const m:Month={budget:10000,categories:[{id:'a',name:'Dom',limit:6000,color:0},{id:'b',name:'Jedzenie',limit:4000,color:1}],expenses:[{id:'1',categoryId:'a',amount:1000,note:'',date:'2026-10-01'},{id:'2',categoryId:'b',amount:500,note:'',date:'2026-10-02'}]};
 it('sumuje wydatki i przydziały',()=>{expect(spent(m)).toBe(1500);expect(spent(m,'a')).toBe(1000);expect(allocated(m)).toBe(10000);expect(spent(emptyMonth())).toBe(0);});
 it('uwzględnia edycję i usunięcie wydatku',()=>{expect(spent({...m,expenses:m.expenses.map(e=>e.id==='1'?{...e,amount:2500,categoryId:'b'}:e)},'a')).toBe(0);expect(spent({...m,expenses:m.expenses.filter(e=>e.id!=='1')})).toBe(500);});
 it('sprawdza strukturę zapisu i powiązania kategorii',()=>{expect(validData({version:1,months:{'2026-10':m}})).toBe(true);expect(validData({version:1,months:{'2026-10':{...m,expenses:[{...m.expenses[0],categoryId:'missing'}]}}})).toBe(false);expect(validData({version:2,months:{}})).toBe(false);expect(validData(null)).toBe(false);});
});
