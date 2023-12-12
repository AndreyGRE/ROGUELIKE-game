
class MapGenerator {
  constructor(
    mapWidth,
    mapHeight,
    minRoomSize,
    maxRoomSize,
    minRooms,
    maxRooms,
    minPassages,
    maxPassages,
    heroX, 
    heroY,
    map = []
  ) {
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.minRoomSize = minRoomSize;
    this.maxRoomSize = maxRoomSize;
    this.minRooms = minRooms;
    this.maxRooms = maxRooms;
    this.minPassages = minPassages;
    this.maxPassages = maxPassages;
    this.map = map;
    this.heroX, 
    this.heroY
  }
  
  generateEmptyMap() {
    for (let i = 0; i < this.mapHeight; i++) {
      let row = [];
      for (let j = 0; j < this.mapWidth; j++) {
        row.push({ type: 1 }); // 1 - стена, 0 - проход
      }
      this.map.push(row);
    }
  }

  generateRooms() {
    // Генерация случайного количества комнат
    const rooms = [];
    const numOfRooms =
      Math.floor(Math.random() * (this.maxRooms - this.minRooms + 1)) +
      this.minRooms;

    for (let i = 0; i < numOfRooms; i++) {
      const roomWidth =
        Math.floor(Math.random() * (this.maxRoomSize - this.minRoomSize + 1)) +
        this.minRoomSize;
      const roomHeight =
        Math.floor(Math.random() * (this.maxRoomSize - this.minRoomSize + 1)) +
        this.minRoomSize;
      const x = Math.floor(Math.random() * (this.mapWidth - roomWidth - 1)) + 1;
      const y =
        Math.floor(Math.random() * (this.mapHeight - roomHeight - 1)) + 1;
      for (let j = y; j < y + roomHeight; j++) {
        for (let k = x; k < x + roomWidth; k++) {
          this.map[j][k] = { type: 0 }; // 0 - проход (комната)
        }
      }
      rooms.push({ x, y, width: roomWidth, height: roomHeight });
    }

    // Добавление проходов между комнатами
    for (let i = 0; i < rooms.length - 1; i++) {
      let room1 = rooms[i];
      let room2 = rooms[i + 1];
      let center1 = {
        x: Math.floor(room1.x + room1.width / 2),
        y: Math.floor(room1.y + room1.height / 2),
      };
      let center2 = {
        x: Math.floor(room2.x + room2.width / 2),
        y: Math.floor(room2.y + room2.height / 2),
      };
      while (center1.x !== center2.x) {
        this.map[center1.y][center1.x].type = 0;
        center1.x += center1.x < center2.x ? 1 : -1;
      }
      while (center1.y !== center2.y) {
        this.map[center1.y][center1.x].type = 0;
        center1.y += center1.y < center2.y ? 1 : -1;
      }
    }
  }

  generatePassages() {
    const numOfHorizontalPassages =
      Math.floor(Math.random() * (this.maxPassages - this.minPassages + 1)) + this.minPassages;
    const numOfVerticalPassages =
      Math.floor(Math.random() * (this.maxPassages - this.minPassages + 1)) + this.minPassages;

    for (let i = 0; i < numOfHorizontalPassages; i++) {
      const passageY = Math.floor(Math.random() * (this.mapHeight - 3)) + 1;

      // Расположение прохода по вертикали
      for (let j = 0; j < this.mapWidth; j++) {
        this.map[passageY][j] = { type: 0 }; // 0 - проход
      }
    }

    for (let i = 0; i < numOfVerticalPassages; i++) {
      const passageX = Math.floor(Math.random() * (this.mapWidth - 3)) + 1;
      // Расположение прохода по горизонтали
      for (let j = 0; j < this.mapHeight; j++) {
        this.map[j][passageX] = { type: 0 }; // 0 - проход
      }
    }
  }

    generateObjects(){
        // Генерация случайного количества мечей 2
        const swords = [];
        const numOfSwords = 2;
        let placedSwords = 0;

        while (placedSwords < numOfSwords) {
            const x = Math.floor(Math.random() * this.mapWidth);
            const y = Math.floor(Math.random() * this.mapHeight);
            if (this.map[y][x].type === 0) {
                // Проверка, что выбранная клетка пустая
                this.map[y][x] = { type: 2, prop: 20 }; // 2 - меч
                swords.push({ x, y });
                placedSwords++;
            }
        }

        // Генерация случайного количества зелий 3

        const potions = [];
        const numOfPotions = 10;
        let placedPotions = 0;

        while (placedPotions < numOfPotions) {
            const x = Math.floor(Math.random() * this.mapWidth);
            const y = Math.floor(Math.random() * this.mapHeight);
            if (this.map[y][x].type === 0) {
                // Проверка, что выбранная клетка пустая
                this.map[y][x] = { type: 3, prop: 20 }; // 3 - зелье
                potions.push({ x, y });
                placedPotions++;
            }
        }

        // Генерация противники 5

        const opponent = [];
        const numOfOpponent = 10;
        let placedOpponent = 0;

        while (placedOpponent < numOfOpponent) {
            const x = Math.floor(Math.random() * this.mapWidth);
            const y = Math.floor(Math.random() * this.mapHeight);
            if (this.map[y][x].type === 0) {
                // Проверка, что выбранная клетка пустая
                this.map[y][x] = { type: 5, HP: 100 }; // 5 - противник
                opponent.push({ x, y });
                placedOpponent++;
            }
        }
        // Генерация героя и его расположения 4
        // ебать эти переменные нужны ниже ***************************** 
        do {
            this.heroX = Math.floor(Math.random() * this.mapWidth);
            this.heroY = Math.floor(Math.random() * this.mapHeight);
        } while (this.map[this.heroY][this.heroX].type !== 0); // Пока не найдем пустую клетку для размещения героя
        {this.map[this.heroY][this.heroX] = { type: 4, HP: 100, atack: 20 };} // 4 - герой
        return [this.heroX , this.heroY]
        
    }        
    
    getMap(){
    // обновление карты
        const mapElement = document.querySelector(".field");
        mapElement.innerHTML = "";
        for (let i = 0; i < this.mapHeight; i++) {
            for (let j = 0; j < this.mapWidth; j++) {
                let cell = document.createElement("div");
                if (this.map[i][j].type === 0) {
                    cell.classList.add("tile");
                }
                if (this.map[i][j].type === 1) {
                    cell.classList.add("tileW");
                }
                if (this.map[i][j].type === 2) {
                    cell.classList.add("tileSW");
                }
                if (this.map[i][j].type === 3) {
                    cell.classList.add("tileHP");
                }
                if (this.map[i][j].type === 4) {
                    cell.classList.add("tileP");
                    let div = document.createElement("div");
                    div.classList.add("health");
                    div.style.width = `${this.map[i][j].HP}%`;
                    cell.appendChild(div);
                }
                if (this.map[i][j].type === 5) {
                    cell.classList.add("tileE");
                    let div = document.createElement("div");
                    div.classList.add("health");
                    div.style.width = `${this.map[i][j].HP}%`;
                    cell.appendChild(div);
                }
                mapElement.appendChild(cell);
            }
        }
        // для отладки
        return this.map;
    }

}

class ActionsHeros {

    constructor(key,heroX,heroY,map,mapWidth,mapHeight){
        this.key = key,
        this.heroX = heroX,
        this.heroY = heroY,
        this.map = map,
        this.mapWidth = mapWidth,
        this.mapHeight = mapHeight
    }
    moveHero() {
   
        let newHeroX = this.heroX;
        let newHeroY = this.heroY;
        let HeroInfo;

        const adjacentCells = [
            [this.heroX, this.heroY - 1], // Верхняя клетка
            [this.heroX, this.heroY + 1], // Нижняя клетка
            [this.heroX - 1, this.heroY], // Левая клетка
            [this.heroX + 1, this.heroY], // Правая клетка
          ];
    
        switch (this.key) {
          case "w":
            if (this.heroY > 0 && (this.map[this.heroY - 1][this.heroX].type === 0 || this.map[this.heroY - 1][this.heroX].type === 2 || this.map[this.heroY - 1][this.heroX].type === 3)) {
              if (this.map[this.heroY - 1][this.heroX].type === 3) {
                this.map[this.heroY][this.heroX].HP += this.map[this.heroY - 1][this.heroX].prop;
              }
              if (this.map[this.heroY - 1][this.heroX].type === 2) {
                this.map[this.heroY][this.heroX].atack += this.map[this.heroY - 1][this.heroX].prop;
              }
              newHeroY = this.heroY - 1;
            }
            break;
    
          case "s":
            
            if (this.heroY < this.mapHeight - 1 && (this.map[this.heroY + 1][this.heroX].type === 0 || this.map[this.heroY + 1][this.heroX].type === 3 || this.map[this.heroY + 1][this.heroX].type === 2)) {
               
                if (this.map[this.heroY + 1][this.heroX].type === 3) {
                this.map[this.heroY][this.heroX].HP += this.map[this.heroY + 1][this.heroX].prop;
                }
                if (this.map[this.heroY + 1][this.heroX].type === 2) {
                    this.map[this.heroY][this.heroX].atack += this.map[this.heroY + 1][this.heroX].prop;
                }
                newHeroY = this.heroY + 1;
              
            }
            break;
    
          case "a":
            if (this.heroX > 0 && (this.map[this.heroY][this.heroX - 1].type === 0 || this.map[this.heroY][this.heroX - 1].type === 3 || this.map[this.heroY][this.heroX - 1].type === 2)) {
              if (this.map[this.heroY][this.heroX - 1].type === 3) {
                this.map[this.heroY][this.heroX].HP += this.map[this.heroY][this.heroX - 1].prop;
              }
              if (this.map[this.heroY][this.heroX - 1].type === 2) {
                this.map[this.heroY][this.heroX].atack += this.map[this.heroY][this.heroX - 1].prop;
              }
              newHeroX = this.heroX - 1;
            }
            break;
    
          case "d":
            if (this.heroX < this.mapWidth - 1 && (this.map[this.heroY][this.heroX + 1].type === 0 || this.map[this.heroY][this.heroX + 1].type === 3 || this.map[this.heroY][this.heroX + 1].type === 2)) {
              if (this.map[this.heroY][this.heroX + 1].type === 2) {
                this.map[this.heroY][this.heroX].atack += this.map[this.heroY][this.heroX + 1].prop;
              }
              if (this.map[this.heroY][this.heroX + 1].type === 3) {
                this.map[this.heroY][this.heroX].HP += this.map[this.heroY][this.heroX + 1].prop;
              }
              newHeroX = this.heroX + 1;
            }
            break;

            case " ":
            for (let i = 0; i < adjacentCells.length; i++) {
                const x = adjacentCells[i][0];
                const y = adjacentCells[i][1];
                    if (
                    x >= 0 &&
                    x < this.mapWidth &&
                    y >= 0 &&
                    y < this.mapHeight &&
                    this.map[y][x].type === 5
                    ) {
                    // Противник на соседней клетке, атакуем его
                    this.map[y][x].HP = this.map[y][x].HP - this.map[heroY][heroX].atack;
                        if (this.map[y][x].HP <= 0) {
                            this.map[y][x] = { type: 0 };
                            // Удаляем противника
                        }
                    }
                }
                break;
            }
    
        if (newHeroX !== this.heroX || newHeroY !== this.heroY) {
          HeroInfo = this.map[this.heroY][this.heroX];
          this.map[this.heroY][this.heroX] = { type: 0 };
          this.heroX = newHeroX;
          this.heroY = newHeroY;
          this.map[this.heroY][this.heroX] = HeroInfo;
        }
        mapGenerator.getMap()
        return [this.heroX , this.heroY]
    }

}

class ActionOpponent{
    constructor(mapHeight,mapWidth,map,heroX,heroY){
        this.mapHeight = mapHeight,
        this.mapWidth = mapWidth,
        this.map = map,
        this.heroX = heroX,
        this.heroY = heroY
    }
    moveOpponent(){
        for (let y = 0; y < this.mapHeight; y++) {
                for (let x = 0; x < this.mapWidth; x++) {
                  if (this.map[y][x].type === 5) {
                    // Проверяем, что это клетка с противником
                    // Реализация случайного передвижения противника
                    let randomDirection = Math.floor(Math.random() * 4); // Генерируем случайное направление (0 - вверх, 1 - вниз, 2 - влево, 3 - вправо)
                    let newX = x;
                    let newY = y;
                    let opponentInfo;
                    if (randomDirection === 0 && y > 0 && this.map[y - 1][x].type === 0) {
                      newY = y - 1; // Движение вверх
                    } else if (
                      randomDirection === 1 &&
                      y < this.mapHeight - 1 &&
                      this.map[y + 1][x].type === 0
                    ) {
                      newY = y + 1; // Движение вниз
                    } else if (randomDirection === 2 && x > 0 && this.map[y][x - 1].type === 0) {
                      newX = x - 1; // Движение влево
                    } else if (
                      randomDirection === 3 &&
                      x < this.mapWidth - 1 &&
                      this.map[y][x + 1].type === 0
                    ) {
                      newX = x + 1; // Движение вправо
                    }
                    if (newX !== x || newY !== y) {
                      opponentInfo = { ...this.map[y][x] };
                      this.map[y][x] = { type: 0 }; // Очищаем текущую позицию противника
                      this.map[newY][newX] = { ...opponentInfo }; // Обновляем позицию противника на карте
                    }
                }
            }
        }
        mapGenerator.getMap()
    }
    attackOponent(){
        for (let y = 0; y < this.mapHeight; y++) {
                for (let x = 0; x < this.mapWidth; x++) {
                  if (this.map[y][x].type === 5) {
                    // Проверяем, что это клетка с противником
                    // Реализация атаку вокруг
                    const adjacentCells = [
                      [x, y - 1], // Верхняя клетка
                      [x, y + 1], // Нижняя клетка
                      [x - 1, y], // Левая клетка
                      [x + 1, y], // Правая клетка
                    ];
                    for (let i = 0; i < adjacentCells.length; i++) {
                      const x = adjacentCells[i][0];
                      const y = adjacentCells[i][1];
                      if (
                        x >= 0 &&
                        x < this.mapWidth &&
                        y >= 0 &&
                        y < this.mapHeight &&
                        this.map[y][x].type === 4
                      ) {
                        // Герой на соседней клетке, атакуем его
                        this.map[heroY][heroX].HP = this.map[heroY][heroX].HP - 10;
                        if (this.map[heroY][heroX].HP <= 0) {
                            this.map[heroY][heroX] = { type: 0 };
                            heroY = null;
                            heroX = null;
                            alert("УМЕР");
                            // Удаляем противника
                        }
                      }
                    }
                }
            }
        }
        mapGenerator.getMap()
    }
}

const mapWidth = 40;
const mapHeight = 24;
const minRoomSize = 3;
const maxRoomSize = 8;
const minRooms = 5;
const maxRooms = 10;
const minPassages = 3;
const maxPassages = 5;
let map = []
let heroX, heroY;

const mapGenerator = new MapGenerator(mapWidth, mapHeight, minRoomSize, maxRoomSize, minRooms, maxRooms, minPassages, maxPassages, heroX, heroY, map);
mapGenerator.generateEmptyMap();
mapGenerator.generateRooms();
mapGenerator.generatePassages();
let XY = mapGenerator.generateObjects();
map = mapGenerator.getMap();
heroX = XY[0];
heroY = XY[1];

// передвижение и удары Героя
document.addEventListener("keydown", function (e){
    const key = e.key.toLowerCase();
    const actionsHeros = new ActionsHeros(key,heroX,heroY,map,mapWidth,mapHeight)
    XY = actionsHeros.moveHero()
    heroX = XY[0];
    heroY = XY[1];
})
// передвижение и удары Противников и условие победы
const game = setInterval(() => {
    const actionOpponent = new ActionOpponent(mapHeight,mapWidth,map,heroX,heroY)
    actionOpponent.moveOpponent()
    setTimeout(() => {
       actionOpponent.attackOponent()
    }, 1500);
    // победа
    let victory = false;
    let loss = true;
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j].type == 5) {
                victory = true
                }
            if (map[i][j].type == 4)
                loss = false;
        } 
    }
    if (!victory){
        clearInterval(game)
        alert("Победа")
        location.reload()
    }
    if (loss){
        clearInterval(game)
        alert("Проигрыш")
        location.reload()
    }
}, 3000);

    



 