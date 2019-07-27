.PHONY: all clean createCsv deleteDB moveCsv
all:
	@./sqliteToCsv.sh data.csv
	@mv data.csv $$THESISPATH/data
	@rm -f GolfGlove.db
	$$THESISPATH/data/plot.R
	cd $$THESISPATH/data/
	feh -q *.png --auto-zoom \
		--sort filename --borderless \
		--scale-down --draw-filename \
		--image-bg black \
		$$THESISPATH/data
	#@openimage $$THESISPATH/data/
	cd $$HOME/workspace/senior-design/golf-glove/coachApp/backend/db

clean:
	@rm -f GolfGlove.db data.csv

createCsv:
	@./sqliteToCsv.sh data.csv

deleteDB:
	@rm -f GolfGlove.db

moveCsv:
	@mv data.csv $$THESISPATH/data

