// Jing-Yi Wu
class Task {
    constructor(options = {}) {
        Object.assign(this, {
            subj: false,
            TrialN: 0,
            // trialN: 0,
            titles: '',
            savingScript: '',
            dataFile: 'task.txt',
            stimPath: 'media/',
            savingDir: 'data/testing',
            // pracList: [],
            // trialList: [],
            intertrialInterval: 0.1,
            updateFunc: false,
            trialFunc: false,
            endExptFunc: false,
        }, options);
        this.videoDict = options.videoDict || {};  // full video list
        this.usedVideos = new Set();               // to track no-repeats
        this.learningList = [];
        this.reviewList = [];
        this.testingList = [];
        this.blockNum = 0;
        this.trialNum = -this.TrialN;
        this.allData = list_to_formatted_string(this.titles.slice());
        this.complete = false;
        this.getSubjectData();
    }

    // // Class 1 Trials
    // buildTrials() {
    //     const allClasses = Object.keys(EXPERIMENT_VIDEOS);
    //     const class1Verbs = Object.keys(EXPERIMENT_VIDEOS.class1);

    //     // 1. Learning Phase: 3 verbs from target class, 2 videos each
    //     const learningVerbs = shuffle_array(class1Verbs).slice(0, 3);

    //     for (let verb of learningVerbs) {
    //         const vids = shuffle_array(EXPERIMENT_VIDEOS.class1[verb]).slice(0, 2);

    //         vids.forEach(v => this.usedVideos.add(v));

    //         this.learningList.push(
    //             ...vids.map(file => ({
    //                 phase: 'learning',
    //                 verb,
    //                 file
    //             }))
    //         );
    //     }

    //     this.learningList = shuffle_array(this.learningList);
    //     this.totalLearningTrials = this.learningList.length;

    //     // 2. Testing Phase
    //     // 2.1 Positive: 2 verbs from class1, 2 videos each, not used in learning
    //     const remainingPosVerbs = class1Verbs.filter(v => !learningVerbs.includes(v));
    //     const posTestVerbs = shuffle_array(remainingPosVerbs).slice(0, 2);

    //     for (let verb of posTestVerbs) {
    //         const available = EXPERIMENT_VIDEOS.class1[verb]
    //             .filter(v => !this.usedVideos.has(v));

    //         const selected = shuffle_array(available).slice(0, 2);

    //         selected.forEach(v => this.usedVideos.add(v));

    //         this.testingList.push(
    //             ...selected.map(file => ({
    //                 phase: 'testing',
    //                 verb,
    //                 file,
    //                 label: 'positive'
    //             }))
    //         );
    //     }

    //     // 2.2 Negative: pick 2 verbs × 2 videos from each of class2, class3, class4
    //     for (let className of ['class2', 'class3', 'class4']) {
    //         const verbs = Object.keys(EXPERIMENT_VIDEOS[className]);
    //         const selectedVerbs = shuffle_array(verbs).slice(0, 2);

    //         for (let verb of selectedVerbs) {
    //             const available = EXPERIMENT_VIDEOS[className][verb]
    //                 .filter(v => !this.usedVideos.has(v));

    //             const selected = shuffle_array(available).slice(0, 2);

    //             selected.forEach(v => this.usedVideos.add(v));

    //             this.testingList.push(
    //                 ...selected.map(file => ({
    //                     phase: 'testing',
    //                     verb,
    //                     file,
    //                     label: 'negative'
    //                 }))
    //             );
    //         }
    //     }

    //     // 2.3 Add attention check
    //     this.testingList.push({
    //         phase: 'testing',
    //         verb: 'attention_check',
    //         file: 'check.mp4',
    //         label: 'check'
    //     });

    //     // Finalize
    //     this.testingList = shuffle_array(this.testingList);
    //     this.totalTestingTrials = this.testingList.length;
    // }


    // getSubjectData() {
    //     this.num = this.subj.num;
    //     this.date = this.subj.date;
    //     this.subjStartTime = this.subj.startTime;
    //     this.phase = 'learning';
    // }


    // updateTrial() {
    //     this.trialNum++;

    //     if (this.nextPhase) {
    //         this.phase = this.nextPhase;
    //         this.nextPhase = null;
    //     }

    //     let trialList;
    //     let currentPhase = this.phase;

    //     if (currentPhase === 'learning') {
    //         trialList = this.learningList;
    //     } else if (currentPhase === 'testing') {
    //         trialList = this.testingList;
    //     }

    //     this.thisTrial = trialList.shift();

    //     const last = trialList.length === 0;

    //     this.updateFunc(
    //         currentPhase,
    //         last,
    //         this.thisTrial,
    //         trialList[0] || null,
    //         this.stimPath
    //     );

    //     if (last) {
    //         this.nextPhase = (currentPhase === 'learning') ? 'testing' : 'done';
    //     }
    // }


    // // Class 2 Trials
    // buildTrials() {
    //     const allClasses = Object.keys(EXPERIMENT_VIDEOS);
    //     const class2Verbs = Object.keys(EXPERIMENT_VIDEOS.class2);
    
    //     // 1. Learning Phase: 3 verbs from target class, 2 videos each
    //     const learningVerbs = shuffle_array(class2Verbs).slice(0, 3);
    
    //     for (let verb of learningVerbs) {
    //         const vids = shuffle_array(EXPERIMENT_VIDEOS.class2[verb]).slice(0, 2);
    
    //         vids.forEach(v => this.usedVideos.add(v));
    
    //         this.learningList.push(
    //             ...vids.map(file => ({
    //                 phase: 'learning',
    //                 verb,
    //                 file
    //             }))
    //         );
    //     }
    
    //     this.learningList = shuffle_array(this.learningList);
    //     this.totalLearningTrials = this.learningList.length;
    
    //     // 2. Testing Phase
    //     // 2.1 Positive: 2 verbs from class2, 2 videos each, not used in learning
    //     const remainingPosVerbs = class2Verbs.filter(v => !learningVerbs.includes(v));
    //     const posTestVerbs = shuffle_array(remainingPosVerbs).slice(0, 2);
    
    //     for (let verb of posTestVerbs) {
    //         const available = EXPERIMENT_VIDEOS.class2[verb]
    //             .filter(v => !this.usedVideos.has(v));
    
    //         const selected = shuffle_array(available).slice(0, 2);
    
    //         selected.forEach(v => this.usedVideos.add(v));
    
    //         this.testingList.push(
    //             ...selected.map(file => ({
    //                 phase: 'testing',
    //                 verb,
    //                 file,
    //                 label: 'positive'
    //             }))
    //         );
    //     }
    
    //     // 2.2 Negative: pick 2 verbs × 2 videos from each of class1, class3, class4
    //     for (let className of ['class1', 'class3', 'class4']) {
    //         const verbs = Object.keys(EXPERIMENT_VIDEOS[className]);
    //         const selectedVerbs = shuffle_array(verbs).slice(0, 2);
    
    //         for (let verb of selectedVerbs) {
    //             const available = EXPERIMENT_VIDEOS[className][verb]
    //                 .filter(v => !this.usedVideos.has(v));
    
    //             const selected = shuffle_array(available).slice(0, 2);
    
    //             selected.forEach(v => this.usedVideos.add(v));
    
    //             this.testingList.push(
    //                 ...selected.map(file => ({
    //                     phase: 'testing',
    //                     verb,
    //                     file,
    //                     label: 'negative'
    //                 }))
    //             );
    //         }
    //     }
    
    //     // 2.3 Add attention check
    //     this.testingList.push({
    //         phase: 'testing',
    //         verb: 'attention_check',
    //         file: 'check.mp4',
    //         label: 'check'
    //     });
    
    //     // Finalize
    //     this.testingList = shuffle_array(this.testingList);
    //     this.totalTestingTrials = this.testingList.length;
    // }
    
    
    // getSubjectData() {
    //     this.num = this.subj.num;
    //     this.date = this.subj.date;
    //     this.subjStartTime = this.subj.startTime;
    //     this.phase = 'learning';
    // }
    
    
    // updateTrial() {
    //     this.trialNum++;
    
    //     if (this.nextPhase) {
    //         this.phase = this.nextPhase;
    //         this.nextPhase = null;
    //     }
    
    //     let trialList;
    //     let currentPhase = this.phase;
    
    //     if (currentPhase === 'learning') {
    //         trialList = this.learningList;
    //     } else if (currentPhase === 'testing') {
    //         trialList = this.testingList;
    //     }
    
    //     this.thisTrial = trialList.shift();
    
    //     const last = trialList.length === 0;
    
    //     this.updateFunc(
    //         currentPhase,
    //         last,
    //         this.thisTrial,
    //         trialList[0] || null,
    //         this.stimPath
    //     );
    
    //     if (last) {
    //         this.nextPhase = (currentPhase === 'learning') ? 'testing' : 'done';
    //     }
    // }






    // Class 3 Trials
    buildTrials() {
        const allClasses = Object.keys(EXPERIMENT_VIDEOS);
        const class3Verbs = Object.keys(EXPERIMENT_VIDEOS.class3);
    
        // 1. Learning Phase: 3 verbs from target class, 2 videos each
        const learningVerbs = shuffle_array(class3Verbs).slice(0, 3);
    
        for (let verb of learningVerbs) {
            const vids = shuffle_array(EXPERIMENT_VIDEOS.class3[verb]).slice(0, 2);
    
            vids.forEach(v => this.usedVideos.add(v));
    
            this.learningList.push(
                ...vids.map(file => ({
                    phase: 'learning',
                    verb,
                    file
                }))
            );
        }
    
        this.learningList = shuffle_array(this.learningList);
        this.totalLearningTrials = this.learningList.length;
    
        // 2. Testing Phase
        // 2.1 Positive: 2 verbs from class3, 2 videos each, not used in learning
        const remainingPosVerbs = class3Verbs.filter(v => !learningVerbs.includes(v));
        const posTestVerbs = shuffle_array(remainingPosVerbs).slice(0, 2);
    
        for (let verb of posTestVerbs) {
            const available = EXPERIMENT_VIDEOS.class3[verb]
                .filter(v => !this.usedVideos.has(v));
    
            const selected = shuffle_array(available).slice(0, 2);
    
            selected.forEach(v => this.usedVideos.add(v));
    
            this.testingList.push(
                ...selected.map(file => ({
                    phase: 'testing',
                    verb,
                    file,
                    label: 'positive'
                }))
            );
        }
    
        // 2.2 Negative: pick 2 verbs × 2 videos from each of class1, class2, class4
        for (let className of ['class1', 'class2', 'class4']) {
            const verbs = Object.keys(EXPERIMENT_VIDEOS[className]);
            const selectedVerbs = shuffle_array(verbs).slice(0, 2);
    
            for (let verb of selectedVerbs) {
                const available = EXPERIMENT_VIDEOS[className][verb]
                    .filter(v => !this.usedVideos.has(v));
    
                const selected = shuffle_array(available).slice(0, 2);
    
                selected.forEach(v => this.usedVideos.add(v));
    
                this.testingList.push(
                    ...selected.map(file => ({
                        phase: 'testing',
                        verb,
                        file,
                        label: 'negative'
                    }))
                );
            }
        }
    
        // 2.3 Add attention check
        this.testingList.push({
            phase: 'testing',
            verb: 'attention_check',
            file: 'check.mp4',
            label: 'check'
        });
    
        // Finalize
        this.testingList = shuffle_array(this.testingList);
        this.totalTestingTrials = this.testingList.length;
    }
    
    
    getSubjectData() {
        this.num = this.subj.num;
        this.date = this.subj.date;
        this.subjStartTime = this.subj.startTime;
        this.phase = 'learning';
    }
    
    
    updateTrial() {
        this.trialNum++;
    
        if (this.nextPhase) {
            this.phase = this.nextPhase;
            this.nextPhase = null;
        }
    
        let trialList;
        let currentPhase = this.phase;
    
        if (currentPhase === 'learning') {
            trialList = this.learningList;
        } else if (currentPhase === 'testing') {
            trialList = this.testingList;
        }
    
        this.thisTrial = trialList.shift();
    
        const last = trialList.length === 0;
    
        this.updateFunc(
            currentPhase,
            last,
            this.thisTrial,
            trialList[0] || null,
            this.stimPath
        );
    
        if (last) {
            this.nextPhase = (currentPhase === 'learning') ? 'testing' : 'done';
        }
    }



    // // Class 4 Trials
    // buildTrials() {
    //     const allClasses = Object.keys(EXPERIMENT_VIDEOS);
    //     const class4Verbs = Object.keys(EXPERIMENT_VIDEOS.class4);
    //
    //     // 1. Learning Phase: 3 verbs from target class, 2 videos each
    //     const learningVerbs = shuffle_array(class4Verbs).slice(0, 3);
    //
    //     for (let verb of learningVerbs) {
    //         const vids = shuffle_array(EXPERIMENT_VIDEOS.class4[verb]).slice(0, 2);
    //
    //         vids.forEach(v => this.usedVideos.add(v));
    //
    //         this.learningList.push(
    //             ...vids.map(file => ({
    //                 phase: 'learning',
    //                 verb,
    //                 file
    //             }))
    //         );
    //     }
    //
    //     this.learningList = shuffle_array(this.learningList);
    //     this.totalLearningTrials = this.learningList.length;
    //
    //     // 2. Testing Phase
    //     // 2.1 Positive: 2 verbs from class4, 2 videos each, not used in learning
    //     const remainingPosVerbs = class4Verbs.filter(v => !learningVerbs.includes(v));
    //     const posTestVerbs = shuffle_array(remainingPosVerbs).slice(0, 2);
    //
    //     for (let verb of posTestVerbs) {
    //         const available = EXPERIMENT_VIDEOS.class4[verb]
    //             .filter(v => !this.usedVideos.has(v));
    //
    //         const selected = shuffle_array(available).slice(0, 2);
    //
    //         selected.forEach(v => this.usedVideos.add(v));
    //
    //         this.testingList.push(
    //             ...selected.map(file => ({
    //                 phase: 'testing',
    //                 verb,
    //                 file,
    //                 label: 'positive'
    //             }))
    //         );
    //     }
    //
    //     // 2.2 Negative: pick 2 verbs × 2 videos from each of class1, class2, class3
    //     for (let className of ['class1', 'class2', 'class3']) {
    //         const verbs = Object.keys(EXPERIMENT_VIDEOS[className]);
    //         const selectedVerbs = shuffle_array(verbs).slice(0, 2);
    //
    //         for (let verb of selectedVerbs) {
    //             const available = EXPERIMENT_VIDEOS[className][verb]
    //                 .filter(v => !this.usedVideos.has(v));
    //
    //             const selected = shuffle_array(available).slice(0, 2);
    //
    //             selected.forEach(v => this.usedVideos.add(v));
    //
    //             this.testingList.push(
    //                 ...selected.map(file => ({
    //                     phase: 'testing',
    //                     verb,
    //                     file,
    //                     label: 'negative'
    //                 }))
    //             );
    //         }
    //     }
    //
    //     // 2.3 Add attention check
    //     this.testingList.push({
    //         phase: 'testing',
    //         verb: 'attention_check',
    //         file: 'check.mp4',
    //         label: 'check'
    //     });
    //
    //     // Finalize
    //     this.testingList = shuffle_array(this.testingList);
    //     this.totalTestingTrials = this.testingList.length;
    // }
    //
    //
    // getSubjectData() {
    //     this.num = this.subj.num;
    //     this.date = this.subj.date;
    //     this.subjStartTime = this.subj.startTime;
    //     this.phase = 'learning'; // Initialize phase tracker
    // }
    //
    //
    // updateTrial() {
    //     this.trialNum++;
    //
    //     // Apply phase transition if one is pending
    //     if (this.nextPhase) {
    //         this.phase = this.nextPhase;
    //         this.nextPhase = null;
    //     }
    //
    //     let trialList;
    //     let currentPhase = this.phase;
    //
    //     if (currentPhase === 'learning') {
    //         trialList = this.learningList;
    //     } else if (currentPhase === 'testing') {
    //         trialList = this.testingList;
    //     }
    //
    //     this.thisTrial = trialList.shift();
    //
    //     const last = trialList.length === 0;
    //
    //     this.updateFunc(
    //         currentPhase,
    //         last,
    //         this.thisTrial,
    //         trialList[0] || null,
    //         this.stimPath
    //     );
    //
    //     if (last) {
    //         this.nextPhase = (currentPhase === 'learning') ? 'testing' : 'done';
    //     }
    // }




    run() {
        var that = this;

        this.updateTrial();  // 🔍 <--- This is where `updateTrial()` is called

        const start_stim = function() {
            that.trialFunc(that.thisTrial, that.phase);
            that.startTime = Date.now();
        };

        setTimeout(start_stim, this.intertrialInterval * 1000);
    }

// 3. End current trial and save trial data
    end(resp) {
        const currentTime = Date.now();
        // rt starts from the buttons appearance
        let startTimeToUse;
        if (this.thisTrial.phase === 'testing' && this.thisTrial.startTime) {
            // For testing: use button appearance time
            startTimeToUse = this.thisTrial.startTime;
        } else {
            // For learning/review: use trial start time
            startTimeToUse = this.startTime;
        }

        this.rt = (currentTime - startTimeToUse) / 1000;
        this.response = resp;

        let playCount = 0;
        if (this.thisTrial.phase === 'learning') {
            playCount = $("#expLearningVid").data("playCount") || 0;
        } else if (this.thisTrial.phase === 'review') {
            playCount = $("#expReviewVid").data("playCount") || 0;
        } else if (this.thisTrial.phase === 'testing') {
            playCount = $("#expTestingVid").data("playCount") || 0;
        }

        // Save current trial data...
        const trialData = {
            subj: this.num,
            trialNum: this.trialNum,
            phase: this.thisTrial.phase,
            verb: this.thisTrial.verb,
            file: this.thisTrial.file,
            rt: this.rt,
            response: this.response,
            playCounts: playCount
        };
        this.allData += list_to_formatted_string(Object.values(trialData));

        const currentPhase = this.phase; // Store ORIGINAL phase
        let trialList =
            currentPhase === 'learning' ? this.learningList :
                currentPhase === 'review'   ? this.reviewList :
                    currentPhase === 'testing'  ? this.testingList : [];

        if (trialList.length > 0) {
            this.run(); // Next trial in same phase
        } else {
            // Phase just ended - call endFunc with ORIGINAL phase before updating
            if (typeof this.endExptFunc === "function") {
                this.endExptFunc(currentPhase); // Pass the original phase
            }

            // THEN update phase for next time
            if (currentPhase === 'learning') {
                this.phase = 'review';
            } else if (currentPhase === 'review') {
                this.phase = 'testing';
            } else if (currentPhase === 'testing') {
                this.complete = true;
                this.save();
                return; // Don't call endExptFunc again
            }
        }
    }



// 4. Save to server
    save() {
        const postData = {
            directory_path: this.savingDir,
            file_name: this.dataFile,
            data: this.allData
        };

        $.ajax({
            type: 'POST',
            url: this.savingScript,
            data: postData,
            success: () => {
                console.log(`✅ Task data saved successfully to ${this.savingDir}/${this.dataFile}`);
            },
            error: (xhr, status, error) => {
                console.error(`❌ Task data save failed: ${status} — ${error}`);
            }
        });
    }
}
