import * as React from 'react';

export interface NameLabel {
  name: string;
  label: string;
}

export interface Props {
  fields: NameLabel[];
  obj: any;
  onChange(name: string, value: string);
  onSave();
}

export function render(props: Props) {
  const { fields, obj, onChange, onSave } = props;
  const htmlFields = fields.map((kf, i) => {
    return (
      <div key={i + 'htmlFields'}>
        <div className='form-group'>
          <label className='control-label col-sm-2'>{kf.label}:</label>
          <div className='col-sm-10'>
            <input type='text' className='form-control'
              value={obj[kf.name]}
              onChange={evt => onChange(kf.name, evt.target.value)}
            />
          </div>
        </div>
        <br />
      </div>
    );
  });

  return (
    <div>
      {htmlFields}
      <br/>
      <div className='form-group' >
        <div className='col-sm-offset-2 col-sm-10'>
          <button className='btn btn-default' onClick={onSave} >Salvar</button>
        </div>
      </div>
    </div>
  );
}