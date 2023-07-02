const getRandomValue = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      roundCount: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterBarStyle() {
      if (this.monsterHealth < 0) {
        return { width: '0%' };
      }
      return { width: this.monsterHealth + '%' };
    },
    playerBarStyle() {
      if (this.playerHealth < 0) {
        return { width: '0%' };
      }
      return { width: this.playerHealth + '%' };
    },
    specialAttackDisable() {
      return this.roundCount % 4 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // DRAW
        this.winner = 'draw';
      } else if (value <= 0) {
        // PLAYER LOST
        this.winner = 'monster';
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        //DRAW
        this.winner = 'draw';
      } else if (value < 0) {
        // MONSTER LOST
        this.winner = 'player';
      }
    },
  },
  methods: {
    surrender() {
      this.winner = 'monster';
    },
    startNewGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.roundCount = 0;
      this.winner = null;
      this.logMessages = [];
    },

    attackMonster() {
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.roundCount++;
    },

    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
    },

    specialAttackMonster() {
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.roundCount++;
    },

    healPlayer() {
      const healValue = getRandomValue(8, 21);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.roundCount++;
      this.attackPlayer();
    },
    addLogMessage(who, what, value) {},
  },
});

app.mount('#game');
