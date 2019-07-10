# whackaKanji

Technologies used:
	No software in particular?
	But I used AJAX with a free API to get my collections of Kanji characters.
	I put some headers directly into index.html as placeholders. Also manually included an iframe for music. The rest of the code was DOM.

Approach:
	I built many simple games, trying to improve one feature at a time - it began with a 3x3 whack-a-mole grid where everything was activated on-click (eg. click one mole, another appears). I added, in rough order:
		time limit and score updates
		AJAX calls to replace the mole with a random kanji character.
	  a second WRONG kanji character to confuse the reader.
		removal of grid and switch to absolute positioning of popups.
		CSS fadeouts of clicked kanji
		floating score notifications (eg. +1!)
		a setTimeout loop to create real and wrong kanji independent of clicks
		added auto-fadeout to un-clicked kanji
		randomised the setTimeout loop interval
		added music
		added select bars to control intervals, music and kanji difficulty
		touched up the horrible CSS

Unsolved problems:
	Could not prevent kanji pop-ups from overlapping. Working backwards, I was not able to find a way to store information on which elements were still visible, since they were popping up at random and disappearing all the time (clicked or not)

	API limitations: many promising features were only available from paid APIs and/or APIs that required Node.js.