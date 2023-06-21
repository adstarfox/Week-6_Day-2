const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
let driver;

beforeEach(async () => {
    driver = new Builder().forBrowser(Browser.CHROME).build();
});

afterEach(async () => {
    await driver.quit();
});

test("Check the movie as watched", async () => {
    await driver.get('http://localhost:3000/');
    await driver.findElement(By.id('add-movie-input')).sendKeys('The GodFather',Key.RETURN);
    await driver.findElement(By.css('input[type="checkbox"]')).click();

    const status = await driver.wait(until.elementLocated(By.css('#message')),1000);

    expect(await status.getText()).toBe('Watched The GodFather');
});

test("Check to see if the movie is deleted", async () => {
    await driver.get('http://localhost:3000/');
    await driver.findElement(By.id('add-movie-input')).sendKeys('The GodFather',Key.RETURN);

    let deleteMovie = await driver.findElement(By.css('button[class="delete-btn"]'));

    await driver.sleep(1000);
    await deleteMovie.click();
    await driver.sleep(1000);

    let isDeleted = await driver.findElements(By.xpath('//ul/li'))
    expect(isDeleted.length === 0).toBe(true)
});

describe("Checking to see if the message is diplaying", () => {
    test("The watched message is displaying", async () => {
        await driver.get('http://localhost:3000/');
        await driver.findElement(By.id('add-movie-input')).sendKeys('The GodFather',Key.RETURN);
        await driver.findElement(By.css('input[type="checkbox"]')).click();

        const status = await driver.wait(until.elementLocated(By.css('#message')),1000);

        expect(await status.getText()).toBe('Watched The GodFather');
    });

    test("The unwatched message is displaying", async () => {
        await driver.get('http://localhost:3000/');
        await driver.findElement(By.id('add-movie-input')).sendKeys('The GodFather',Key.RETURN);
        await driver.findElement(By.css('input[type="checkbox"]')).click();

        const status = await driver.wait(until.elementLocated(By.css('#message')),1000);

        expect(await status.getText()).toBe('Added back The GodFather');
    });

    test("The deleted message is displaying", async () => {
        await driver.get('http://localhost:3000/');
        await driver.findElement(By.id('add-movie-input')).sendKeys('The GodFather',Key.RETURN);
        await driver.findElement(By.css('button[class="delete-btn"]')).click();

        const status = await driver.wait(until.elementLocated(By.css('#message')),1000);

        expect(await status.getText()).toBe('The GodFather deleted!');
    });
})

