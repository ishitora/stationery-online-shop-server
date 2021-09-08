//商品分類的資料

module.exports = [
  {
    name: 'stationery',
    nameCHT: '文具',
    path: '',
  },
  {
    name: 'writing',
    nameCHT: '筆記具',
    path: ',stationery,',
  },
  {
    name: 'pencil',
    nameCHT: '鉛筆',
    path: ',stationery,writing,',
  },
  {
    name: 'mechanical-pencil',
    nameCHT: '自動鉛筆',
    path: ',stationery,writing,',
  },
  {
    name: 'pen',
    nameCHT: '原子筆/中性筆',
    path: ',stationery,writing,',
  },
  {
    name: 'fountain-pen',
    nameCHT: '鋼筆',
    path: ',stationery,writing,',
  },
  {
    name: 'not-pen',
    nameCHT: '筆類周邊',
    path: ',stationery,writing,',
  },
  {
    name: 'ink',
    nameCHT: '墨水',
    path: ',stationery,writing,not-pen,',
  },
  {
    name: 'eraser',
    nameCHT: '橡皮擦',
    path: ',stationery,writing,not-pen,',
  },
  {
    name: 'pencil-sharpener',
    nameCHT: '削鉛筆器',
    path: ',stationery,writing,not-pen,',
  },
  {
    name: 'paper',
    nameCHT: '紙製品',
    path: ',stationery,',
  },
  {
    name: 'notebook',
    nameCHT: '筆記本',
    path: ',stationery,paper,',
  },
  {
    name: 'diary',
    nameCHT: '手帳/日記',
    path: ',stationery,paper,',
  },
  {
    name: 'loose-leaf',
    nameCHT: '活頁紙',
    path: ',stationery,paper,',
  },
  {
    name: 'office',
    nameCHT: '事務用品',
    path: ',stationery,',
  },
  {
    name: 'ruler',
    nameCHT: '尺',
    path: ',stationery,office,',
  },
  {
    name: 'scissors',
    nameCHT: '剪刀',
    path: ',stationery,office,',
  },
  {
    name: 'storage',
    nameCHT: '收納',
    path: ',stationery,',
  },
  {
    name: 'folder',
    nameCHT: '資料夾/活頁夾',
    path: ',stationery,storage,',
  },
  {
    name: 'pencil-case',
    nameCHT: '筆袋/筆盒',
    path: ',stationery,storage,',
  },
  {
    name: 'desk',
    nameCHT: '桌面收納',
    path: ',stationery,storage,',
  },
];
