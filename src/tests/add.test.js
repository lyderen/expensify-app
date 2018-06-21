const generetGreeting = (name) => `hello ${name}`;

test('should print a name with string  hello', () => {
    const result = generetGreeting('levi');

    expect(result).toBe(`hello levi`);
})