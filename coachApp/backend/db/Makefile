.PHONY: all clean createCsv deleteDB moveCsv
all:
	@./sqliteToCsv.sh data.csv
	@mv data.csv $$THESISPATH/data
	@rm -f GolfGlove.db
	# process data into swings
	#$$THESISPATH/data/process.R

clean:
	@rm -f GolfGlove.db data.csv

createCsv:
	@./sqliteToCsv.sh data.csv

deleteDB:
	@rm -f GolfGlove.db

moveCsv:
	@mv data.csv $$THESISPATH/data

