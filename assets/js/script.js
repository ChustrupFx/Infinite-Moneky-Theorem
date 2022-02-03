const alphanums =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const targetWord = "unicorn";

class Individual {
  genes = [];

  constructor(genes = null) {
    if (!genes) {
      this.genes = this.generateRandomGenes();
    } else {
      this.genes = genes;
    }
    console.log(">> Individual genes: " + this.genes);
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
}

const individual = new Individual();
