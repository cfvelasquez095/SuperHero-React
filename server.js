const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const data = require('./public/heroes.json')

function filter(hero) {
  let heroes = {
    id: hero.id,
    img: hero.images.xs,
    name: hero.biography.fullName,
    alias: hero.name,
    race: hero.race,
    gender: hero.gender,
    strength: hero.strength,
    power: hero.power,
    int: hero.intelligence,
    speed: hero.speed
  }
  return heroes;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/allHeroes', (req, res) => {
  const allHeroes = data.map(hero => {
    return filter(hero);
  })
  res.json(allHeroes);
});

app.get('/above60str', (req, res) => {
  const above60str = data.filter(hero => (hero.strength > 60)).map(hero => {
    return filter(hero);
  })
  res.json(above60str);
})

app.get('/top10power', (req, res) => {
  const top10power = data.sort((hero1,hero2) => (hero2.power > hero1.power) ? 1 : ((hero1.power > hero2.power) ? -1 : 0)).map(hero => {
    return filter(hero);
  }).slice(0, 10)
  res.json(top10power);
})

app.get('/above60speedBelow60int', (req, res) => {
  const above60speedBelow60int = data.filter(hero => (hero.speed > 60 && hero.intelligence < 60)).map(hero => {
    return filter(hero);
  })
  res.json(above60speedBelow60int);
})

app.get('/top10intHuman', (req, res) => {
  const top10intHuman = data.sort((hero1,hero2) => (hero2.intelligence > hero1.intelligence) ? 1 : ((hero1.power > hero2.power) ? -1 : 0))
  .filter(hero => (hero.race === 'Human')).map(hero => {
    return filter(hero);
  }).slice(0, 10)
  res.json(top10intHuman);
})

app.get('/top10speedNonHuman', (req, res) => {
  const top10speedNonHuman = data.filter(hero => (hero.race !== 'Human'))
  .sort((hero1,hero2) => (hero2.speed > hero1.speed) ? 1 : ((hero1.speed > hero2.speed) ? -1 : 0))
  .map(hero => {
    return filter(hero);
  }).slice(0, 10)
  res.json(top10speedNonHuman);
})

app.get('/above80strNonHumanWomen', (req, res) => {
  const above80strNonHumanWomen = data.filter(hero => (hero.strength > 80 && hero.race !== 'Human' && hero.gender === 'Female')).map(hero => {
    return filter(hero);
  })
  res.json(above80strNonHumanWomen);
})

app.listen(port, () => console.log(`Listening on port ${port}`));