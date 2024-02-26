(function () {

    //
    // Helpers
    //

    window.scrollTo = (id) => {
        if (id == null) {
            return;
        }

        if (document == null) {
            return;
        }

        try {
            var element = document.querySelector(id);
            var topPos = element.getBoundingClientRect().top + window.scrollY;

            scroll({
                top: topPos,
                behavior: 'smooth'
            });
        }
        catch (exception) {
            console.log(exception.message);
        }
    
    };

    //
    // Local storage
    //

    window.setItem = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    }

    window.getItem = (key) => {
        return JSON.parse(localStorage.getItem(key));
    }

    //
    // Tone code
    //

    var audioCtx = new AudioContext();
    var gainNode, oscillator;

    window.createAudio = () => {
        // Create oscillator and gain node
        oscillator = audioCtx.createOscillator();
        gainNode = audioCtx.createGain();

        // Connect oscillator to gain node
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        // Set oscillator options
        oscillator.start(0);

        // Create initial frequency and volume
        gainNode.gain.value = 0.0001;
        gainNode.gain.minValue = 0.0001;
        gainNode.gain.maxValue = 0.0001;
    }

    window.disposeAudio = () => {
        oscillator.stop();
    }

    window.tone1 = () => {
        oscillator.frequency.value = 880;
        gainNode.gain.value = 1;

        setTimeout(() => {
            gainNode.gain.value = 0.0001;
        }, 200);
    };

    window.tone2 = () => {
        oscillator.frequency.value = 1760;
        gainNode.gain.value = 1;

        setTimeout(() => {
            gainNode.gain.value = 0.0001;
        }, 300);
    };

    //
    // Lazy load images
    //

    window.lazyLoadImage = (src) => {
        return new Promise(resolve => {
            var img = new Image();
            img.src = src;

            img.onload = () => {
                resolve(true);
            }
        });
    };

})();
