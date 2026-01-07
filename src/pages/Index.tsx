import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function Index() {
  const [currentSection, setCurrentSection] = useState('home');
  const [calcMaterial, setCalcMaterial] = useState('');
  const [calcHeight, setCalcHeight] = useState('');
  const [calcWidth, setCalcWidth] = useState('');
  const [calcPrice, setCalcPrice] = useState<number | null>(null);

  const materials = [
    { name: 'Гранит Габбро', price: 45000, description: 'Чёрный карельский гранит' },
    { name: 'Гранит Мансуровский', price: 38000, description: 'Серый гранит с розовыми вкраплениями' },
    { name: 'Мрамор Коелга', price: 52000, description: 'Белый мрамор премиум класса' },
    { name: 'Гранит Дымовский', price: 42000, description: 'Серо-голубой гранит' },
  ];

  const gallery = [
    { id: 1, title: 'Семейный мемориал', material: 'Гранит Габбро', year: '2023' },
    { id: 2, title: 'Вертикальный памятник', material: 'Мрамор Коелга', year: '2023' },
    { id: 3, title: 'Горизонтальный комплекс', material: 'Гранит Мансуровский', year: '2024' },
    { id: 4, title: 'Памятник с крестом', material: 'Гранит Дымовский', year: '2024' },
    { id: 5, title: 'Мемориальная стела', material: 'Гранит Габбро', year: '2023' },
    { id: 6, title: 'Комплекс с оградой', material: 'Мрамор Коелга', year: '2024' },
  ];

  const services = [
    { icon: 'Hammer', title: 'Производство памятников', description: 'Изготовление из гранита и мрамора любой сложности' },
    { icon: 'Palette', title: 'Художественная гравировка', description: 'Портреты, надписи, орнаменты' },
    { icon: 'Package', title: 'Доставка по России', description: 'Отправка в любой город страны' },
    { icon: 'Wrench', title: 'Установка и благоустройство', description: 'Полный комплекс работ на месте' },
  ];

  const calculatePrice = () => {
    if (!calcMaterial || !calcHeight || !calcWidth) return;
    
    const material = materials.find(m => m.name === calcMaterial);
    if (!material) return;
    
    const height = parseFloat(calcHeight);
    const width = parseFloat(calcWidth);
    const area = (height * width) / 10000;
    
    const basePrice = material.price * area;
    const installationPrice = basePrice * 0.3;
    const total = basePrice + installationPrice;
    
    setCalcPrice(Math.round(total));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent rounded-sm flex items-center justify-center">
              <Icon name="Castle" size={28} className="text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-foreground">Вечная память</h1>
              <p className="text-xs text-muted-foreground">Мемориальная мастерская</p>
            </div>
          </div>
          
          <nav className="hidden md:flex gap-6">
            {[
              { id: 'home', label: 'Главная', icon: 'Home' },
              { id: 'gallery', label: 'Галерея', icon: 'Image' },
              { id: 'calculator', label: 'Калькулятор', icon: 'Calculator' },
              { id: 'about', label: 'О нас', icon: 'Info' },
              { id: 'contact', label: 'Контакты', icon: 'Mail' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentSection(item.id)}
                className={`flex items-center gap-2 text-sm transition-colors hover:text-primary ${
                  currentSection === item.id ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
              >
                <Icon name={item.icon} size={16} />
                {item.label}
              </button>
            ))}
          </nav>
          
          <Button className="hidden md:flex" onClick={() => setCurrentSection('contact')}>
            <Icon name="Phone" size={16} className="mr-2" />
            Заказать звонок
          </Button>
        </div>
      </header>

      {currentSection === 'home' && (
        <section className="relative py-24 bg-gradient-to-b from-muted/50 to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
              <div className="inline-block px-4 py-2 bg-accent/10 rounded-full">
                <p className="text-sm font-medium text-accent-foreground">Более 15 лет создаём память</p>
              </div>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground leading-tight">
                Памятники из гранита и мрамора
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Производство мемориальных комплексов с полным благоустройством. 
                Доставка в любой город России.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-6">
                <Button size="lg" onClick={() => setCurrentSection('calculator')}>
                  <Icon name="Calculator" size={20} className="mr-2" />
                  Рассчитать стоимость
                </Button>
                <Button size="lg" variant="outline" onClick={() => setCurrentSection('gallery')}>
                  <Icon name="Image" size={20} className="mr-2" />
                  Посмотреть работы
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
              {services.map((service, idx) => (
                <Card key={idx} className="hover-scale">
                  <CardHeader>
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                      <Icon name={service.icon} size={24} className="text-accent-foreground" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
              {[
                { value: '2000+', label: 'Выполненных работ' },
                { value: '15 лет', label: 'На рынке' },
                { value: '50+', label: 'Городов доставки' },
                { value: '100%', label: 'Гарантия качества' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl font-serif font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {currentSection === 'gallery' && (
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl font-serif font-bold mb-4">Галерея работ</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Каждый памятник — это уникальное произведение, созданное с любовью и уважением к памяти
              </p>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
                <TabsTrigger value="all">Все работы</TabsTrigger>
                <TabsTrigger value="granite">Гранит</TabsTrigger>
                <TabsTrigger value="marble">Мрамор</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gallery.map((item) => (
                    <Card key={item.id} className="overflow-hidden group hover-scale">
                      <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 flex items-end p-6">
                          <div className="text-white space-y-1">
                            <h3 className="font-serif font-bold text-xl">{item.title}</h3>
                            <p className="text-sm opacity-90">{item.material}</p>
                            <p className="text-xs opacity-75">{item.year}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="granite">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gallery.filter(item => item.material.includes('Гранит')).map((item) => (
                    <Card key={item.id} className="overflow-hidden group hover-scale">
                      <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 flex items-end p-6">
                          <div className="text-white space-y-1">
                            <h3 className="font-serif font-bold text-xl">{item.title}</h3>
                            <p className="text-sm opacity-90">{item.material}</p>
                            <p className="text-xs opacity-75">{item.year}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="marble">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gallery.filter(item => item.material.includes('Мрамор')).map((item) => (
                    <Card key={item.id} className="overflow-hidden group hover-scale">
                      <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 flex items-end p-6">
                          <div className="text-white space-y-1">
                            <h3 className="font-serif font-bold text-xl">{item.title}</h3>
                            <p className="text-sm opacity-90">{item.material}</p>
                            <p className="text-xs opacity-75">{item.year}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      )}

      {currentSection === 'calculator' && (
        <section className="py-16">
          <div className="container max-w-4xl">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl font-serif font-bold mb-4">Калькулятор стоимости</h2>
              <p className="text-muted-foreground">
                Рассчитайте примерную стоимость памятника онлайн
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Параметры памятника</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="material">Материал</Label>
                  <Select value={calcMaterial} onValueChange={setCalcMaterial}>
                    <SelectTrigger id="material">
                      <SelectValue placeholder="Выберите материал" />
                    </SelectTrigger>
                    <SelectContent>
                      {materials.map((mat) => (
                        <SelectItem key={mat.name} value={mat.name}>
                          {mat.name} — {mat.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Высота (см)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="120"
                      value={calcHeight}
                      onChange={(e) => setCalcHeight(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="width">Ширина (см)</Label>
                    <Input
                      id="width"
                      type="number"
                      placeholder="60"
                      value={calcWidth}
                      onChange={(e) => setCalcWidth(e.target.value)}
                    />
                  </div>
                </div>

                <Button onClick={calculatePrice} className="w-full" size="lg">
                  <Icon name="Calculator" size={20} className="mr-2" />
                  Рассчитать стоимость
                </Button>

                {calcPrice !== null && (
                  <div className="bg-accent/10 border-2 border-accent rounded-lg p-6 text-center animate-scale-in">
                    <div className="text-sm text-muted-foreground mb-2">Примерная стоимость</div>
                    <div className="text-4xl font-serif font-bold text-primary mb-2">
                      {calcPrice.toLocaleString('ru-RU')} ₽
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Включая установку и благоустройство
                    </div>
                  </div>
                )}

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-lg">Доступные материалы</h3>
                  <div className="grid gap-4">
                    {materials.map((mat) => (
                      <div key={mat.name} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">{mat.name}</div>
                          <div className="text-sm text-muted-foreground">{mat.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary">{mat.price.toLocaleString('ru-RU')} ₽</div>
                          <div className="text-xs text-muted-foreground">за м²</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {currentSection === 'about' && (
        <section className="py-16">
          <div className="container max-w-4xl">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl font-serif font-bold mb-4">О нашей мастерской</h2>
              <p className="text-muted-foreground">
                История, опыт и традиции создания памятников
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-serif flex items-center gap-2">
                    <Icon name="History" size={24} />
                    Наша история
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    Мемориальная мастерская "Вечная память" работает с 2008 года. Мы начинали как небольшая семейная 
                    мастерская и за 15 лет выросли в крупное производство с собственным цехом и командой мастеров.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    За это время мы изготовили более 2000 памятников и мемориальных комплексов, каждый из которых 
                    создавался с особым вниманием к деталям и уважением к памяти ушедших.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-serif flex items-center gap-2">
                    <Icon name="Award" size={24} />
                    Наши преимущества
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {[
                      { icon: 'CheckCircle', text: 'Собственное производство полного цикла' },
                      { icon: 'CheckCircle', text: 'Работа с лучшими сортами гранита и мрамора' },
                      { icon: 'CheckCircle', text: 'Современное оборудование для обработки камня' },
                      { icon: 'CheckCircle', text: 'Опытные мастера-художники' },
                      { icon: 'CheckCircle', text: 'Гарантия на все виды работ' },
                      { icon: 'CheckCircle', text: 'Доставка и установка по всей России' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Icon name={item.icon} size={20} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-serif flex items-center gap-2">
                    <Icon name="Truck" size={24} />
                    Доставка в любой город
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Мы организуем доставку готовых памятников в любой город России. Работаем с проверенными 
                    транспортными компаниями, гарантируем сохранность груза.
                  </p>
                  <div className="bg-muted rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Москва и область</span>
                      <span className="text-sm text-muted-foreground">3-5 дней</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Санкт-Петербург</span>
                      <span className="text-sm text-muted-foreground">5-7 дней</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Регионы РФ</span>
                      <span className="text-sm text-muted-foreground">7-14 дней</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {currentSection === 'contact' && (
        <section className="py-16">
          <div className="container max-w-4xl">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl font-serif font-bold mb-4">Связаться с нами</h2>
              <p className="text-muted-foreground">
                Оставьте заявку, и мы свяжемся с вами в ближайшее время
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-serif">Форма заказа</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ваше имя</Label>
                      <Input id="name" placeholder="Иван Иванович" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="example@mail.ru" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Город доставки</Label>
                      <Input id="city" placeholder="Москва" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Комментарий</Label>
                      <Textarea id="message" placeholder="Расскажите о ваших пожеланиях..." rows={4} />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      <Icon name="Send" size={20} className="mr-2" />
                      Отправить заявку
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Phone" size={20} />
                      Телефон
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-primary">+7 (800) 555-35-35</p>
                    <p className="text-sm text-muted-foreground mt-1">Звонок бесплатный</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Clock" size={20} />
                      Режим работы
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Пн-Пт</span>
                      <span className="font-medium">9:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Суббота</span>
                      <span className="font-medium">10:00 - 16:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Воскресенье</span>
                      <span className="font-medium">Выходной</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="MapPin" size={20} />
                      Адрес производства
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      г. Москва, ул. Мастеровая, д. 15<br />
                      Промышленная зона "Северная"
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Mail" size={20} />
                      Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-primary font-medium">info@vechn-pamyat.ru</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="border-t bg-muted/30 mt-20">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-serif font-bold text-lg mb-4">Вечная память</h3>
              <p className="text-sm text-muted-foreground">
                Мемориальная мастерская полного цикла. Производство памятников с 2008 года.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Производство памятников</li>
                <li>Художественная гравировка</li>
                <li>Установка и благоустройство</li>
                <li>Доставка по России</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>О компании</li>
                <li>Галерея работ</li>
                <li>Калькулятор стоимости</li>
                <li>Контакты</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (800) 555-35-35
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@vechn-pamyat.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  Москва, ул. Мастеровая, 15
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Вечная память. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;