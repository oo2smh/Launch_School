/* [30min]
Write a program that prints the longest sentence in a string based on the
number of words. Sentences may end with periods (.), exclamation points (!), or
question marks (?). You should treat any sequence of characters that are not
spaces or sentence-ending characters as a word. Thus, -- should count as a
word. Log the longest sentence and its word count to the console. Pay attention
to the expected output, and be sure you preserve the punctuation from the end
of the sentence. Note that this problem is about manipulating and processing
strings. As such, every detail about the string matters (e.g., case,
punctuation, tabs, spaces, etc.).
================================
GOAL: Print longest sentence in in:str based on number of words along iwth word count.
IN: {str}
OUT: {console.log} longestSentence and "The longest sentence has __ words."
RULES:
- sentences may end with (.!?)
- any chars that are not spaces or (.!?) as words
- Preserve punctuation from sentence
- is about manipulating and processing strings
- preserve punctuation, tabs, spaces, etc

DS: array to separate words

PROCESS
- CREATE v:longestSentence;
- CREATE v:currentLength = 0
- CREATE v:punctuation to store a list of punctuation
- SEPARATE strings based on punctuation mark (.?!)
    FOR each sentence, count the number of words
      IF i:sentence.len > v:currentLength
        SET v:currentLength = i:sentence.length
        SET v:longestSentence = i:sentence + punctuation[idx]
- PRINT v:longestSentence and v:currentLength
*/

function longestSentence(text) {
  let longestSentence;
  let currentLength = 0;
  let punctuation = [...text].filter((char) => "!?.".includes(char));

  // Problem is that using split here removes the punctuation
  text.split(/[!.?]/).forEach((sentence, idx) => {
    let sentenceLength = sentence.split(" ").length;
    if (sentenceLength > currentLength) {
      currentLength = sentenceLength;
      longestSentence = sentence + punctuation[idx];
    }
  });

  console.log(longestSentence);
  console.log(`The longest sentence has ${currentLength} words.`);
}

let longText =
  "Four score and seven years ago our fathers brought forth on this " +
  "continent a new nation, conceived in liberty, and dedicated to the " +
  "proposition that all men are created equal. Now we are engaged in a " +
  "great civil war, testing whether that nation, or any nation so " +
  "conceived and so dedicated, can long endure. We are met on a great " +
  "battlefield of that war. We have come to dedicate a portion of that " +
  "field, as a final resting place for those who here gave their lives " +
  "that that nation might live. It is altogether fitting and proper that " +
  "we should do this.";

let longerText =
  longText +
  "But, in a larger sense, we can not dedicate, we can not consecrate, " +
  "we can not hallow this ground. The brave men, living and dead, who " +
  "struggled here, have consecrated it, far above our poor power to add " +
  "or detract. The world will little note, nor long remember what we say " +
  "here but it can never forget what they did here. It is for us the " +
  "living, rather, to be dedicated here to the unfinished work which " +
  "they who fought here have thus far so nobly advanced. It is rather " +
  "for us to be here dedicated to the great task remaining before us -- " +
  "that from these honored dead we take increased devotion to that " +
  "cause for which they gave the last full measure of devotion -- that " +
  "we here highly resolve that these dead shall not have died in vain " +
  "-- that this nation, under God, shall have a new birth of freedom -- " +
  "and that government of the people, by the people, for the people, " +
  "shall not perish from the earth.";

//longestSentence(longText);
// Four score and seven years ago our fathers brought forth on this continent a new nation, conceived in liberty, and dedicated to the proposition that all men are created equal.
//
// The longest sentence has 30 words.

//longestSentence(longerText);
// It is rather for us to be here dedicated to the great task remaining before us -- that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion -- that we here highly resolve that these dead shall not have died in vain -- that this nation, under God, shall have a new birth of freedom -- and that government of the people, by the people, for the people, shall not perish from the earth.
//
// The longest sentence has 86 words.

//longestSentence("Where do you think you're going? What's up, Doc?");
// Where do you think you're going?
//
// The longest sentence has 6 words.

//longestSentence("To be or not to be! Is that the question?");
// To be or not to be!
//
// The longest sentence has 6 words.