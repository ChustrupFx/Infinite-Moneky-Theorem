class Individual {
  genes = [];
  fitness;

  constructor(genes = null) {
    if (!genes) {
      this.genes = this.generateRandomGenes();
    } else {
      this.genes = genes;
    }
    this.setFitness();

    console.log(">> Individual genes: " + this.genes);
    console.log(">> Individual fitness: " + this.fitness);
  }

  generateRandomGenes() {
    const genes = [];

    for (let i = 0; i < targetWord.length; i++) {
      const randomChar = alphanums.charAt(
        Math.floor(Math.random() * alphanums.length)
      );

      genes.push(randomChar);
    }

    return genes;
  }

  setFitness() {
    const fitness = this.genes.reduce((accumulator, gene, index) => {
      //   const targetLetter = targetWord[index];
      const targetLetter = targetWord[index];
      if (targetLetter === gene) accumulator -= 1;

      return accumulator;
    }, this.genes.length);

    this.fitness = fitness;
  }
}

const alphanums =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const targetWord = "unicorn";

const populationLength = 200;
const population = [];

for (let i = 0; i <= populationLength; i++) {
  const individual = new Individual();

  population.push(individual);
}
