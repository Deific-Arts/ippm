/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { PlainText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

const styles = {
  heading: {
    margin: '1rem 0'
  },
  row: {
    display: 'grid',
    gap: '1rem',
    alignItems: 'center',
    gridTemplateColumns: '30% 1fr auto',
    marginBottom: '0.5rem'
  },
  input: {
    padding: '0.5rem 1rem',
    border: '1px solid gray',
    whiteSpace: 'nowrap',
  },
  button: {
    fontSize: '3rem',
    lineHeight: '0.5',
    cursor: 'pointer',
    border: 'none',
    padding: '0',
    margin: '0 0 0 -0.5rem',
    background: 'none'
  }
};

const Dependency = (props) => {
  const handleChange = (name, url, index) => {
    const dependencies = [...props.attributes.dependencies];
    if (name) dependencies[index].name = name;
    if (url) dependencies[index].url = url;
    props.setAttributes({ dependencies });
  };

  const handleRemoveLocation = (index) => {
      const dependencies = [...props.attributes.dependencies];
      dependencies.splice(index, 1);
      props.setAttributes({ dependencies });
  };

  return (
    <div style={styles.row}>
      <div>
        <PlainText
          className="dependency-name"
          placeholder="Dependency Name"
          value={ props.attributes.dependencies[props.index].name }
          onChange={ (name) => handleChange(name, null, props.index) }
          style={styles.input}
        />
      </div>
      <div>
        <PlainText
          className="dependency-url"
          placeholder="Dependency URL"
          value={ props.attributes.dependencies[props.index].url }
          onChange={ (url) => handleChange(null, url, props.index) }
          style={styles.input}
        />
      </div>
      <div>
        <button style={styles.button} onClick={() => handleRemoveLocation( props.index )}>&times;</button>
      </div>
    </div>
  );
}

const Edit = ({ className, attributes, setAttributes }) => {
  const handleAddDependency = () => {
      const dependencies = [...attributes.dependencies];
      dependencies.push({ name: '', url: '' });
      setAttributes({ dependencies });
  };

  let dependencyFields;

  if (attributes.dependencies.length) {
    dependencyFields = attributes.dependencies.map((dependency, index) => {
        return <Dependency key={dependency.name} index={index} className={className} attributes={attributes} setAttributes={setAttributes} />;
    } );
  }

  return ([
    <InspectorControls key="dependencies-manager-controls" style={{ marginBottom: '40px' }}>
      <PanelBody>
        <p>IPPM will create a import map of the dependencies you add here.</p>
      </PanelBody>
    </InspectorControls>,
    <section key="dependencies-manager">
      <h3 style={styles.heading}>Dependencies</h3>
      {dependencyFields}
      <button className="button" onClick={handleAddDependency}>Add Dependency</button>
    </section>
  ]);
}

export default Edit;
