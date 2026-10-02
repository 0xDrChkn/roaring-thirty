'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const engine=require('../game/engine.js');
const faces=require('../game/celebrity-faces.js');
const pack={id:'faces-test',categories:[{id:'birthday-girl',clues:[]}],defaultCategoryIds:['birthday-girl']};
test('five selected portraits preserve order, clean prompts and points through reload',()=>{
  assert.ok(faces.portraits.length>=10);
  const ids=faces.portraits.slice(0,5).map(item=>item.id);
  const bank=faces.buildPack(pack,ids);
  assert.deepEqual(bank.categories[0].clues.map(clue=>clue.value),[100,200,300,400,500]);
  assert.deepEqual(bank.categories[0].clues.map(clue=>clue.image),faces.portraits.slice(0,5).map(item=>item.image));
  let state=engine.create(['One','Two'],bank);
  state=engine.answerClue(engine.openClue(state,'bg-100'),1);
  assert.deepEqual(engine.restore(engine.serialize(state),faces.buildPack(pack,ids)),state);
  const reversed=faces.buildPack(pack,ids.slice().reverse());
  assert.equal(engine.restore(engine.serialize(state),reversed),null);
  for(const clue of bank.categories[0].clues)assert.equal(clue.imageAlt.en.includes(clue.answer.en),false);
});
test('the portrait picker rejects duplicates, unknown portraits and non-five lists',()=>{
  for(const ids of [[],['dicaprio'],Array(5).fill('dicaprio'),['dicaprio','gordon-ramsay','rihanna','ryan-gosling','missing']])assert.throws(()=>faces.buildPack(pack,ids));
});

test('the gallery contains unique labels and real bundled images',()=>{
  const fs=require('node:fs'); const path=require('node:path');
  assert.equal(new Set(faces.portraits.map(item=>item.id)).size,faces.portraits.length);
  assert.equal(new Set(faces.portraits.map(item=>item.name)).size,faces.portraits.length);
  for(const face of faces.portraits) assert.equal(fs.existsSync(path.join(__dirname,'../game',face.image)),true,face.image);
});

test('the new five portraits create a complete board with named answers',()=>{
  const ids=['adele','emma-watson','margot-robbie','jason-momoa','chris-hemsworth'];
  const bank=faces.buildPack(pack,ids);
  const names=['Adele','Emma Watson','Margot Robbie','Jason Momoa','Chris Hemsworth'];
  assert.deepEqual(bank.categories[0].clues.map(clue=>clue.answer.en),names);
  assert.deepEqual(bank.categories[0].clues.map(clue=>clue.answer.nb),names);
  assert.deepEqual(bank.categories[0].clues.map(clue=>clue.id),['bg-100','bg-200','bg-300','bg-400','bg-500']);
  assert.doesNotThrow(()=>engine.create(['One','Two'],bank));
});
