import fetch from 'node-fetch';
import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot('6327890988:AAGlslvYASW6HxqIj4JUOyrjWWTd4ltRrjE', { polling: true });

// Function to fetch a random Wikipedia article
async function getRandomWikipediaArticle() {
  try {
    const response = await fetch(
      'https://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&rnlimit=1'
    );
    const data = await response.json();
    const title = data.query.random[0].title;
    console.log(title);
    return title;
  } catch (error) {
    console.error('Error fetching random Wikipedia article:', error);
    throw error;
  }
}

// Function to fetch the summary of a Wikipedia article
async function getSummary(title) {
    try {
        const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&explaintext=true&titles=${encodeURIComponent(
        title
      )}`
      );
      const data = await response.json();
      const page = Object.values(data.query.pages)[0];
      console.log(page.extract);
      return page.extract;
    } catch (error) {
        console.error('Error fetching Wikipedia article summary:', error);
        throw error;
    }
}


// Function to post the random article and its summary to a Telegram group
async function postRandomArticleToGroup(chatId) {
  try {
    const randomTitle = await getRandomWikipediaArticle();
    const summary = await getSummary(randomTitle);

    bot.sendMessage(chatId, `Random Wikipedia Article: ${randomTitle}\n\n${summary}`);

  } catch (error) {
    console.error('Error posting random article to Telegram group:', error);
  }
}

const chatId = '-4092824367';

// Call the function to post the random article to the Telegram group
postRandomArticleToGroup(chatId);