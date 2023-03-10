module CarrierwaveBase64Uploader
  extend ActiveSupport::Concern

  private

    def base64_conversion(uri_str, filename = "base64")
      image_data_binary = Base64.decode64(uri_str)
      temp_img_file = Tempfile.new(filename)

      temp_img_file.binmode
      temp_img_file << image_data_binary
      temp_img_file.rewind

      img_params = { filename: "#{filename}.png", type: "image/png", tempfile: temp_img_file }
      ActionDispatch::Http::UploadedFile.new(img_params)
    end
end
