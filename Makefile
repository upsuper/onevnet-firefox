FILES=\
      manifest.json \
      background.js \
      panel.html \
      panel.js \
      icon.png \
      pac/*.pac

ZIP_FILE=onevnet-firefox.zip

$(ZIP_FILE): $(FILES)
	-rm $@
	zip $@ $^

.PHONY: clean

all: $(ZIP_FILE)

clean:
	rm $(ZIP_FILE)
