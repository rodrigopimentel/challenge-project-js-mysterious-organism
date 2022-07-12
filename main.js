// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Returns an object representing P. aequor
const pAequorFactory = (specimenNum, dna) => {
  return {

    // properties
    _specimenNum: specimenNum,
    _dna: dna,

    // methods

    // randomly mutates a base and returns array of dna bases
    mutate() {
      randIdx = Math.floor((Math.random() * 15));
      newBase = returnRandBase();
      if (this._dna[randIdx] != newBase) {
        this._dna[randIdx] = newBase;
      } else {
        this.mutate();
      }
      return this._dna;
    },

    // returns true if 60% or more of bases or Cs or Gs, false otherwise
    willLikelySurvive() {
      let cOrGCount = 0;
      this._dna.forEach(base => {
        if (base === 'C' || base === 'G') {
          cOrGCount++;
        }
      });
      
      if ((cOrGCount / 15) >= 0.60) {
        return true;
      } else {
        return false;
      }
    },
  
    // compares DNA with another object representing P. aequor and prints out % shared
    compareDNA(pAequorObj) {
      let dnaCommonCount = 0;
      for (let i = 0; i < 15; i++) {
        if (this._dna[i] === pAequorObj._dna[i]) {
          dnaCommonCount++;
        }
      }
      console.log(`specimen ${this._specimenNum} and specimen ${pAequorObj._specimenNum} have ${Math.floor((dnaCommonCount / 15) * 100)}% DNA in common`);
    }
  }
};

// makes a set number of pAequor objects that are likely to survive
const makeFitPAequor = n => {
  let fitPAequors = [];
  let fitCount = 0;
  let tempPAequor;
  while (fitCount < n) {
    tempPAequor = pAequorFactory(fitCount, mockUpStrand());
    if (tempPAequor.willLikelySurvive()) {
      fitPAequors.push(tempPAequor);
      fitCount++;
    }
  }
  return fitPAequors;
};

console.log(makeFitPAequor(30));