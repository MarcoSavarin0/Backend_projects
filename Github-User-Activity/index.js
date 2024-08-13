import readline from 'readline';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}
async function fetchUserActivity(nameUser) {
    try {
        const response = await fetch(`https://api.github.com/users/${nameUser}/events`);
        const data = await response.json();
    
        return data;
    } catch (error) {
        console.log("Error " + error);
        return
    }
}
function formatedGithubData(data) {
    return data.map(event => {
        const repoName = event.repo.name;
        const eventType = event.type;
        let action = '';

        switch (eventType) {
            case 'PushEvent':
                action = `Pushed ${event.payload.commits.length} commits to ${repoName}`;
                break;
            case 'IssuesEvent':
                if (event.payload.action === 'opened') {
                    action = `Opened a new issue in ${repoName}`;
                } else if (event.payload.action === 'closed') {
                    action = `Closed an issue in ${repoName}`;
                }
                break;
            case 'WatchEvent':
                action = `Starred ${repoName}`;
                break;
            case 'ForkEvent':
                action = `Forked ${repoName}`;
                break;
            case 'PullRequestEvent':
                if (event.payload.action === 'opened') {
                    action = `Opened a new pull request in ${repoName}`;
                } else if (event.payload.action === 'closed') {
                    action = `Closed a pull request in ${repoName}`;
                }
                break;
            case 'CreateEvent':
                if (event.payload.ref_type === 'repository') {
                    action = `Created a new repository ${repoName}`;
                } else if (event.payload.ref_type === 'branch') {
                    action = `Created a new branch in ${repoName}`;
                }
                break;
            default:
                action = `Performed ${eventType} in ${repoName}`;
                break;
        }
        return action;
    }).join('\n');
}
(async function main() {
    let isRun = true
    while (isRun) {
        try {
            const nameUser = await askQuestion('Enter your GitHub username:');
    
            if (!nameUser) {
                console.log('Username not found');
                continue;
            }
    
            let data = await fetchUserActivity(nameUser); 
            if (data.lenght == 0) {
                console.log("No data found");
                continue;
            }

            data = formatedGithubData(data);
            console.log(data);
            let doYouExit = await askQuestion('Do you want to exit? [y/n]: ');
            
            
            if (doYouExit == "y") {
                console.log("Bye!");
                isRun = false;
                break;
            } 
        } catch (e) {
            console.log('Error a ' + e);
            break
        }
    }
    rl.close();
})();

