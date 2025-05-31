import Button from './components/Button';
import styles from './App.module.css';

const variants = ['primary', 'secondary', 'danger', 'gray'] as const;
const sizes = ['lg', 'md', 'sm'] as const;

const variantLabels = {
  primary: 'Primary',
  secondary: 'Secondary',
  danger: 'Danger',
  gray: 'Gray',
};

const sizeLabels = {
  lg: 'Large',
  md: 'Medium',
  sm: 'Small',
};

const App = () => {
  return (
    <main className={styles.container}>
      <table className={styles.buttonTable}>
        <thead>
          <tr>
            <th></th>
            {variants.map(variant => (
              <th key={variant}>{variantLabels[variant]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sizes.map(size => (
            <tr key={size}>
              <td className={styles.sizeLabel}>{sizeLabels[size]}</td>
              {variants.map(variant => (
                <td key={variant}>
                  <Button variant={variant} size={size}>
                    {variantLabels[variant]} {sizeLabels[size]}
                  </Button>
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td className={styles.sizeLabel}>Disabled</td>
            {variants.map(variant => (
              <td key={variant}>
                <Button variant={variant} disabled>
                  {variantLabels[variant]} Disabled
                </Button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </main>
  );
};

export default App;
