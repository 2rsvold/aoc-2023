p=parseInt;n=[];require('fs').readFileSync('input.txt').toString().split('\n').forEach(l=>{r=[];l.split('').forEach(d=>{p(d)?r.push(d):null});n.push(p(r[0]+r[r.length-1]))});console.log(n.reduce((a,b)=>a+b,0));
