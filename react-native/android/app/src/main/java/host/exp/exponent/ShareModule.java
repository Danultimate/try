package host.exp.exponent;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Environment;
import android.os.Handler;
import android.os.Looper;
import android.os.Parcelable;
import android.util.Log;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.squareup.picasso.Picasso;
import com.squareup.picasso.Target;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

public class ShareModule extends ReactContextBaseJavaModule {

  protected Context mContext;
  private Handler mHandler = new Handler(Looper.getMainLooper());
  ProgressDialog mProgressDialog;

  public ShareModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "CustomShareModule";
  }

  @ReactMethod
  public void shareText(String text) {
    String text2 = "" + text;

    Intent sendIntent = new Intent();
    sendIntent.setAction(Intent.ACTION_SEND);
    sendIntent.putExtra(Intent.EXTRA_TEXT, text2);
    sendIntent.setType("text/plain");
    this.getReactApplicationContext().startActivity(Intent.createChooser(sendIntent, ""));
  }

  @ReactMethod
  public void shareImage(final String text, final String url) {
    mContext = this.getReactApplicationContext();
    mHandler.post(new Runnable() {
      @Override
      public void run() {
        Log.d("JAVABRIDGE", "Entro en las dos");
        final Uri pictureUri = Uri.parse("" + url);

        Target target = new Target() {
          @Override
          public void onBitmapLoaded(Bitmap bitmap, Picasso.LoadedFrom from) {
            Uri bitmapUri = getLocalBitmapUri(bitmap, mContext, "share_img.png");

            final Intent shareIntent = new Intent();
            shareIntent.setType("image/*");
            shareIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            shareIntent.putExtra(Intent.EXTRA_TEXT, "holaaa");
            shareIntent.putExtra(Intent.EXTRA_STREAM, bitmapUri);
            mContext.startActivity(Intent.createChooser(shareIntent, "Compartir usando"));

          }

          @Override
          public void onBitmapFailed(Drawable errorDrawable) {
            Log.d("JAVABRIDGE", "SHARE IMAGEN TARGET Ex: " + errorDrawable);
          }

          @Override
          public void onPrepareLoad(Drawable placeHolderDrawable) {
          }
        };
        Picasso.with(mContext).load(pictureUri).into(target);
      }
    });
  }


  @ReactMethod
  public void share(final String text,
                    final ReadableArray fileNames,
                    final ReadableArray descriptions,
                    final ReadableArray urls) {
    Log.d("JAVABRIDGE", "filenames "+fileNames);
    Log.d("JAVABRIDGE", "descriptions "+descriptions);
    Log.d("JAVABRIDGE", "urls "+urls);
    mContext = this.getReactApplicationContext();
    mHandler.post(new Runnable() {
      @Override
      public void run() {
        final ArrayList<Uri> files = new ArrayList<Uri>(urls.size());
        for (int i=0; i<urls.size(); i++) {
          final String fileName = fileNames.getString(i);
          final Uri pictureUri = Uri.parse("" + urls.getString(i));
          final String priceTag = descriptions.getString(i);
          Target target = new Target() {
            @Override
            public void onBitmapLoaded(Bitmap bitmap, Picasso.LoadedFrom from) {
              if (!priceTag.equals(""))
                bitmap = drawTextToBitmap(mContext, bitmap, priceTag);
              Uri bitmapUri = getLocalBitmapUri(bitmap, mContext, fileName);
              files.add(bitmapUri);
              Log.d("JAVABRIDGE", "EL bitmapUri " + bitmapUri);
            }

            @Override
            public void onBitmapFailed(Drawable errorDrawable) {
              Log.d("JAVABRIDGE", "SHARE IMAGEN TARGET Ex: " + errorDrawable);
            }

            @Override
            public void onPrepareLoad(Drawable placeHolderDrawable) {
            }
          };
          // Check if file already exist
//          File file =  new File(mContext.getExternalFilesDir(Environment.DIRECTORY_PICTURES), fileName);
//          if (file.exists()) {
//            Log.d("JAVABRIDGE", "El file ya existe!");
//            files.add(Uri.fromFile(file));
//          }
//          else {
            Log.d("JAVABRIDGE", "El file no existe!");
            Picasso.with(mContext).load(pictureUri).into(target);
//          }
        }

        // Hacky fix for first share
        if (files.size() == 0){
          for (int i=0; i<urls.size(); i++) {
            final String fileName = fileNames.getString(i);
            File file = new File(mContext.getExternalFilesDir(Environment.DIRECTORY_PICTURES), fileName);
            if (file.exists()) {
              Log.d("JAVABRIDGE", "El file ya existe!");
              files.add(Uri.fromFile(file));
            }
          }
        }

        // Share intent
        if (files.size() > 0) {
          Intent intent = new Intent();
          intent.setAction(Intent.ACTION_SEND);
          intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
          intent.putExtra(Intent.EXTRA_SUBJECT, "Here are some files.");
          intent.setType("image/*");

          Log.d("JAVABRIDGE", "EL files array " + files);
          intent.setPackage("com.whatsapp");
          intent.putParcelableArrayListExtra(Intent.EXTRA_STREAM, files);
          intent.putExtra(Intent.EXTRA_TEXT, text);

          mContext.startActivity(Intent.createChooser(intent, "Compartir usando"));
        }

      }
    });

  }

  static private Uri getLocalBitmapUri(Bitmap bmp, Context context, String fileName) {
    Uri bmpUri = null;
    try {
      File file =  new File(context.getExternalFilesDir(Environment.DIRECTORY_PICTURES), fileName);
      if (!file.getParentFile().exists()) {
        file.getParentFile().mkdirs();
      }
      FileOutputStream out = new FileOutputStream(file);
      bmp.compress(Bitmap.CompressFormat.PNG, 90, out);
      out.close();
      bmpUri = Uri.fromFile(file);

    } catch (IOException e) {
      e.printStackTrace();
    }
    return bmpUri;
  }

  static private Bitmap drawTextToBitmap(Context gContext, Bitmap bitmap, String gText) {
    Resources resources = gContext.getResources();
    float scale = resources.getDisplayMetrics().density;

    android.graphics.Bitmap.Config bitmapConfig =
      bitmap.getConfig();
    // set default bitmap config if none
    if(bitmapConfig == null) {
      bitmapConfig = android.graphics.Bitmap.Config.ARGB_8888;
    }
    // resource bitmaps are imutable,
    // so we need to convert it to mutable one
    bitmap = bitmap.copy(bitmapConfig, true);


    Canvas canvas = new Canvas(bitmap);
    // new antialised Paint
    Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);
    // text color - #3D3D3D
    paint.setColor(Color.WHITE);
    // text size in pixels
    paint.setTextSize((int) (18 * scale));

    // draw text to the Canvas center
    Paint background = new Paint(Paint.ANTI_ALIAS_FLAG);
    background.setColor(Color.argb(1,91,42,208));
    background.setAlpha(95);
    Rect bounds = new Rect();
    paint.getTextBounds(gText, 0, gText.length(), bounds);

    int x = (int) (20 * scale);
    int y = (int) (40 * scale);

    bounds.offset(x, y);
    bounds.inset(-24, -24);

    canvas.drawRect(bounds, background);
    canvas.drawText(gText, x, y, paint);


    return bitmap;
  }

}
