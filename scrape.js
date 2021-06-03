const fetch = require('node-fetch');
const cheerio = require('cheerio');
const inquirer = require('inquirer');

let getData = (url, element) => {

    fetch(url)
    .then(res => res.text())
		.then(body => {

			$ = cheerio.load(body);

			$(element, body).each(function () {

			return console.info(`\n${$(this).text()}\n\r`);

        });
    });
}

console.log('\r')

inquirer
	.prompt([
		{
			type: "list",
			name: "website",
			message: 'Get latest news from sport websites:',
			choices: [
				{ name: 'Gazzetta', value: 'gazzetta' },
				{ name: 'Goal', value: 'goal' },
				{ name: 'Corriere dello sport', value: 'cds' },
			],
		}
	])
	.then((answers) => {

		if (answers.website === "gazzetta") {

			getData("https://www.gazzetta.it", ".media-content .title a")
		}
		else if (answers.website === "goal") {

			getData("https://www.goal.com/it", ".card h3")
		}
		else if (answers.website === "cds") {

			getData("https://www.corrieredellosport.it/", "[class^='ArticleTitle_title__']")
		}
	})
	.catch((error) => {

		if (error.isTtyError) {

			// Prompt couldn't be rendered in the current environment

		} else {

			// Something else went wrong

		}

	});