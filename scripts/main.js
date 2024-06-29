import renderInventory from "./inventory.js";
import {Enemy, generateEnemy} from "./combat.js";

// Difference between this and save.json? I'm confused
const initialSave = {
  user: "",
  stats: {},
  resources: {
    wood: 0,
    metal: 0,
    science: 0
  },
  inventory: {
    ["cookie", 6],
    ["axe", 1]
  },
  time: 0
};

let game = initialSave;
const save = () => localStorage.setItem("save", JSON.stringify(game));
const load = () => {
  let str = localStorage.getItem("save");
  if (str) {
    game = JSON.parse(str);
  }
  save();
}

const update = (() => {
  let lastTick = Date.now();
  return () => {
    let delta = Date.now() - lastTick;
    lastTick = Date.now();
    game.time += delta / 1000;
  }
})();

const log = [];
const logMessage = (msg, clr) => {
  log.push({msg: msg, clr: clr});
  // do sth with ajax idk
  if (log.length > 20) {
    log.shift();
  }
}

$(document).ready(function () {
  renderInventory(game);
  setInterval(update, 100);
  
  load();
  setInterval(save, 10000);
});

$("#savebtn").click(() => {
  save();
  alert("saved");
});

$("#exportbtn").click(() => {
  navigator.clipboard.writeText(JSON.stringify(game));
  alert("save copied to clipboard");
});

$("#resetbtn").click(() => {
  let yes = prompt("are you sure you want to do this? type 'yes' to confirm");
  if (yes == "yes") {
    game = initialSave;
    save();
  }
});
