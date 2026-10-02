(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.BirthdayCelebrityFaces = api;
})(typeof window !== 'undefined' ? window : null, function () {
  'use strict';
  const portraits = [
    {id:'dicaprio',name:'Leonardo DiCaprio',image:'assets/clue-bg-100.png'},
    {id:'gordon-ramsay',name:'Gordon Ramsay',image:'assets/clue-bg-200.png'},
    {id:'rihanna',name:'Rihanna',image:'assets/clue-bg-400.png'},
    {id:'ryan-gosling',name:'Ryan Gosling',image:'assets/clue-bg-500.png'},
    {id:'marilyn-monroe',name:'Marilyn Monroe',image:'assets/face-marilyn-monroe.png'},
    {id:'brad-pitt',name:'Brad Pitt',image:'assets/face-brad-pitt.png'},
    {id:'angelina-jolie',name:'Angelina Jolie',image:'assets/face-angelina-jolie.png'},
    {id:'dwayne-johnson',name:'Dwayne Johnson',image:'assets/face-dwayne-johnson.png'},
    {id:'beyonce',name:'Beyoncé',image:'assets/face-beyonce.png'},
    {id:'tom-cruise',name:'Tom Cruise',image:'assets/face-tom-cruise.png'},
    {id:'jennifer-aniston',name:'Jennifer Aniston',image:'assets/face-jennifer-aniston.png',reserve:true},
    {id:'adele',name:'Adele',image:'assets/face-adele.png'},
    {id:'emma-watson',name:'Emma Watson',image:'assets/face-emma-watson.png'},
    {id:'margot-robbie',name:'Margot Robbie',image:'assets/face-margot-robbie.png'},
    {id:'jason-momoa',name:'Jason Momoa',image:'assets/face-jason-momoa.png'},
    {id:'chris-hemsworth',name:'Chris Hemsworth',image:'assets/face-chris-hemsworth.png'}
  ];
  function buildPack(pack, ids) {
    if (!Array.isArray(ids) || ids.length !== 5 || new Set(ids).size !== 5) throw new Error('Choose five different portraits.');
    const selected = ids.map(id => portraits.find(portrait => portrait.id === id));
    if (selected.some(portrait => !portrait)) throw new Error('Choose portraits from the gallery.');
    const clues = selected.map((portrait,index) => ({
      id:'bg-' + ((index+1)*100), value:(index+1)*100,
      question:{en:'Which celebrity is blended with Sara?',nb:'Hvilken kjendis er blandet med Sara?'},
      answer:{en:portrait.name,nb:portrait.name}, image:portrait.image,
      imageAlt:{en:'A fictional blended portrait. Name the celebrity.',nb:'Et fiktivt blandet portrett. Finn kjendisen.'}
    }));
    return {...pack,categories:pack.categories.map(category => category.id === 'birthday-girl' ? {...category,clues} : category)};
  }
  return Object.freeze({portraits:Object.freeze(portraits.map(Object.freeze)),buildPack});
});
