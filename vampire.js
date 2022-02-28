class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let vampIndex = 0;
    let vampCursor = this.creator;

    while (vampCursor) {
      vampIndex ++;
      if (vampCursor.creator)
        vampCursor = vampCursor.creator;
      else
        return vampIndex;
    }

    return vampIndex;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {

    if (this.offspring === null)
      return false;

    for (let i = 0; i < this.numberOfOffspring; i++) {
      if (vampire.name === this.offspring[i].name)
        return true;
    }
    return false;
  }

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  isDirectAncestor(vampire) {//depthfirst
    if (this.offspring.includes(vampire)) {
      return true;
    } else {
      for (let vamp of this.offspring) {
        if (vamp.isDirectAncestor(vampire)) {
          return true;
        }
      }
    }
  }
  // Returns the vampire object with that name, or null if no vampire exists with that name
  closestCommonAncestor(vampire) {
    let junior;
    let senior;
    // check seniority
    if (this === vampire) {
      return this;
    }
    if (this.isMoreSeniorThan(vampire)) {
      senior = this;
      junior = vampire;
    } else {
      senior = vampire;
      junior = this;
    }
    // check closest common ancestor
    if (senior.isDirectAncestor(junior)) {
      return senior;
    } else {
      return senior.creator.closestCommonAncestor(junior);
    }
  }
  vampireWithName(name) {
    if (name === this.name) {
      return this;
    }
    for (let vamp of this.offspring) {
      let nameSearch = vamp.vampireWithName(name);
      if (nameSearch) {
        return nameSearch;
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let descendentSum = 0;

    for (let vamp of this.offspring) {
      descendentSum += vamp.totalDescendents + 1;
    }
    return descendentSum;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millenialVamps = []; // 1

    if (this.yearConverted > 1980) {
      millenialVamps.push(this); // 2
    }
    for (let vamp of this.offspring) {
      millenialVamps = millenialVamps.concat(vamp.allMillennialVampires);
    }
    return millenialVamps;
  }
}

module.exports = Vampire;

