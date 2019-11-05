const TypeWriter = function(txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
}

// type method
TypeWriter.prototype.type = function() {
  //current index of words
  const current = this.wordIndex % this.words.length;

  //get full text of current word
  const fullTxt = this.words[current];

  //check if deleting
  if (this.isDeleting) {
    // Remove character
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    //Add character
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // Insert txt into txtElement
  this.txtElement.innerHTML = `<span class"txt">${this.txt}</span>`;

  //Init type speed
  let typeSpeed = 300;

  if (this.isDeleting) {
    typeSpeed /= 2;
  } else {
    console.log("it's running slow");
  }

  //if word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    //make the word pause at the end
    typeSpeed = this.wait;

    //set deleting to true
    this.isDeleting = true;
  } else if(this.isDeleting && this.txt === '') {
    this.isDeleting = false;

    //move to the next word
    this.wordIndex++;

    //pause before it starts typing
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
}


// Init on DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init app
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  //Init typewriter
  new TypeWriter(txtElement, words, wait);
}
