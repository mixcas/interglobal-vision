<?php
get_header();
?>

<main id="main-content">
  <section id="project-list" class="margin-top-extra margin-bottom-large">
    <div class="container">
      <div class="grid-row">

<?php
$projects = new WP_Query( array(
  'posts_per_page' => -1,
  'post_type' => 'project',
));

if ($projects->have_posts()) {
  while ($projects->have_posts()) {
    $projects->the_post();

    $project_type = get_post_meta( get_the_ID(), '_igv_project_type', true );
?>

        <article <?php post_class('grid-item item-s-12 margin-bottom-tiny'); ?> id="post-<?php the_ID(); ?>">

          <h1 class="project-list-title font-size-large font-bold"><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h1>
          <span class="project-list-type font-size-tiny"><?php echo $project_type; ?></span>

        </article>

<?php
  }
}
?>

      </div>
    </div>
  </section>

<?php
  if (is_singular('project')) {
    get_template_part('partials/project');
  }
?>

</main>

<div id="contact">
  <div class="container">
    <div class="grid-row">
      <div class="grid-item item-l-6 offset-l-6 no-gutter font-size-small">
        <?php get_template_part('partials/contact'); ?>
      </div>
    </div>
  </div>
</div>

<?php
  get_footer();
?>
