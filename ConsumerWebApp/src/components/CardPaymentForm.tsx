import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText, FormGroup, FormControlLabel } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Switch from 'material-ui/Switch';
import { observer } from 'mobx-react';
import views from '../Views';
import { Store } from '../model/Store';

function senderNameChanged(store: Store, event) {
  store.onSenderNameChanged(event.target.value);
}

function senderCpfChanged(store: Store, event) {
  store.onSenderCpfChanged(event.target.value);
}

function senderAreaChanged(store: Store, event) {
  store.onSenderAreaCodeChanged(event.target.value);
}

function senderPhoneChanged(store: Store, event) {
  store.onSenderPhoneChanged(event.target.value);
}

function senderEmailChanged(store: Store, event) {
  store.onSenderEmailChanged(event.target.value);
}

function toggleCardHolderOwner(store: Store) {
  store.toggleIsCardHolderOwner();
}


async function onSendOrderRequested(store: Store) {
  await store.onSendOrderRequested();
  await store.pagSeguroTransaction();
  store.router.goTo(views.home, {}, store);
}

const styles = theme => ({
  root: {
    padding: 16,
  },
  container: {
    display: 'flex',
    // flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
    horizontalAlignment: 'center',
  },
});

interface IProps {
  store: Store;
  classes?: any;
}

function CardPaymentForm(props: IProps) {
  const { store, classes } = props;
  return (
    <div className={classes.root}>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="senderName"
          label="Nome do Cliente"
          className={classes.textField}
          value={store.senderName}
          onChange={senderNameChanged.bind(null, store)}
          margin="normal"
        />
      </form>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="senderCpf"
          label="CPF do Cliente"
          className={classes.textField}
          value={store.senderCpf}
          onChange={senderCpfChanged.bind(null, store)}
          margin="normal"
        />
      </form>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="senderAreaCode"
          label="Código de Área"
          className={classes.textField}
          value={store.senderAreaCode}
          onChange={senderAreaChanged.bind(null, store)}
          margin="normal"
        />
      </form>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="senderPhone"
          label="Telefone Para Contato"
          className={classes.textField}
          value={store.senderPhone}
          onChange={senderPhoneChanged.bind(null, store)}
          margin="normal"
        />
      </form>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="senderEmail"
          label="Email do Cliente"
          className={classes.textField}
          value={store.senderEmail}
          onChange={senderEmailChanged.bind(null, store)}
          margin="normal"
        />
      </form>
      <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={store.isCardHolder}
                value="gilad"
                onChange={toggleCardHolderOwner.bind(null, store)}
              />
            }
            label='Irá utilizar o seu cartão de crédito?'
          />
      </FormGroup>
      {!store.isCardHolder && 
        <div>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="creditCardHolderName"
              label="Nome (igual no cartão)"
              className={classes.textField}
              value={store.senderName}
              onChange={senderNameChanged.bind(null, store)}
              margin="normal"
            />
          </form>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="creditCardHolderCPF"
              label="CPF"
              className={classes.textField}
              value={store.senderCpf}
              onChange={senderCpfChanged.bind(null, store)}
              margin="normal"
            />
          </form>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="creditCardHolderBirthDate"
              label="Data de Nascimento"
              className={classes.textField}
              value={store.senderAreaCode}
              onChange={senderAreaChanged.bind(null, store)}
              margin="normal"
            />
          </form>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="creditCardHolderAreaCode"
              label="Código de Área"
              className={classes.textField}
              value={store.senderPhone}
              onChange={senderPhoneChanged.bind(null, store)}
              margin="normal"
            />
          </form>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="creditCardHolderPhone"
              label="Telefone"
              className={classes.textField}
              value={store.senderEmail}
              onChange={senderEmailChanged.bind(null, store)}
              margin="normal"
            />
          </form>
        </div>
      }
            
      <Button variant="raised" className={classes.button}
              onClick={ onSendOrderRequested.bind(null, store) } >
        Enviar Pedido
      </Button>
    </div>
  );
}

export default withStyles(styles)(observer(CardPaymentForm));
