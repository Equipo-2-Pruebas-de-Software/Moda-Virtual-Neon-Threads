const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Manejadores globales de errores
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

(async function loginTest() {
  // Actualizar la ruta de chromedriver
  let serviceBuilder = new chrome.ServiceBuilder('./chromedriver');
  let options = new chrome.Options();

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .setChromeService(serviceBuilder)
    .build();

  try {
    console.log('Navegando a la página de login...');
    await driver.get('http://localhost:3000/login');
    await driver.sleep(1000);

    console.log('Esperando a que el botón esté disponible...');
    await driver.wait(until.elementLocated(By.css('button.btn-link')), 5000);
    await driver.sleep(1000);

    console.log('Completando el formulario de login...');
    await driver.findElement(By.id('login-email')).sendKeys('testuser@example.com');
    await driver.findElement(By.id('login-password')).sendKeys('TestPassword123');
    await driver.sleep(1000);

    console.log('Haciendo clic en el botón de login...');
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.sleep(1000);

    console.log('Esperando la redirección...');
    await driver.wait(until.urlContains('/dashboard'), 5000);
    await driver.sleep(1000);

    console.log('Prueba de login: Éxito');
  } catch (err) {
    console.error('Prueba de login: Fallo', err);
    process.exit(1);
  } finally {
    await driver.quit();
  }
})();
