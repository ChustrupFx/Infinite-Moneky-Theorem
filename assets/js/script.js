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

    // console.log(">> Individual genes: " + this.genes);
    // console.log(">> Individual fitness: " + this.fitness);
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

  getMutatedGene() {
    const randomIndex = parseInt(Math.random() * alphanums.length);

    return alphanums[randomIndex];
  }

  mate(individualB) {
    const genes = this.genes.reduce((accumulator, gene, index) => {
      const thisIndividualGene = gene;
      const individualBGene = individualB.genes[index];

      const randomNumber = Math.random();
      if (randomNumber < 0.45) {
        accumulator.push(thisIndividualGene);
      } else if (randomNumber > 0.45 && randomNumber < 0.9) {
        accumulator.push(individualBGene);
      } else {
        accumulator.push(this.getMutatedGene());
      }

      return accumulator;
    }, []);

    const newIndividual = new Individual(genes);

    return newIndividual;
  }
}

const alphanums =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'@#$%¨&*() ";
const targetWord = "I don't give a fuck for what you think";

const populationLength = 200;
var population = [];
var found = false;
var generation = 1;

for (let i = 0; i < populationLength; i++) {
  const individual = new Individual();

  population.push(individual);
}

while (!found) {
  const populationSortedByFitness = population.sort((a, b) => {
    aFitness = a.fitness;
    bFitness = b.fitness;

    if (aFitness > bFitness) return 1;
    if (aFitness < bFitness) return -1;
    return 0;
  });

  console.log(population[0].fitness, population[0].genes.join(""), generation);
  if (population[0].fitness === 0) {
    found = true;
    break;
  }

  const tenPercentCount = parseInt((10 * populationLength) / 100);
  const newPopulation = populationSortedByFitness.slice(0, tenPercentCount);
  const ninePercentCount = parseInt((90 * populationLength) / 100);

  for (let i = 0; i < ninePercentCount; i++) {
    const fifthPercentCount = parseInt((50 * populationLength) / 100);
    const fifthPercentOfPopulation = population.slice(0, fifthPercentCount);

    const randomIndexA = parseInt(Math.random() * fifthPercentCount);
    const randomIndexB = parseInt(Math.random() * fifthPercentCount);

    const parentA = fifthPercentOfPopulation[randomIndexA];
    const parentB = fifthPercentOfPopulation[randomIndexB];

    const child = parentA.mate(parentB);

    newPopulation.push(child);
  }

  population = newPopulation;

  generation++;
}
