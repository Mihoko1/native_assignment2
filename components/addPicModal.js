import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

class AddPostModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: '',
      phrase: '',
      addedPost: [],
    };
  }

onAddImagePressed = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      if (!result.cancelled) {
        // ImageManipulatorでリサイズ処理
        const actions = [];
        actions.push({ resize: { width: 350 } });
        const manipulatorResult = await ImageManipulator.manipulateAsync(
          result.uri,
          actions,
          {
            compress: 0.4,
          },
        );
        this.setState({
          imgUrl: manipulatorResult.uri,
        });
      }
    }
  };
}